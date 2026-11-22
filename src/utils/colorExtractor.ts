import { ThemeConfig } from '../data/industrialData';

export interface ExtractedLogoPalette {
  theme: ThemeConfig;
  swatches: { label: string; hex: string }[];
  isLightBackground: boolean;
}

function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
  return (
    '#' +
    [clamp(r), clamp(g), clamp(b)]
      .map((x) => x.toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase()
  );
}

function getLuminance(r: number, g: number, b: number): number {
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

function getSaturation(r: number, g: number, b: number): number {
  const max = Math.max(r, g, b) / 255;
  const min = Math.min(r, g, b) / 255;
  if (max === min) return 0;
  const l = (max + min) / 2;
  return l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);
}

function adjustBrightness(r: number, g: number, b: number, factor: number): string {
  return rgbToHex(r * factor, g * factor, b * factor);
}

function mixHex(
  r1: number,
  g1: number,
  b1: number,
  r2: number,
  g2: number,
  b2: number,
  weight: number
): string {
  return rgbToHex(
    r1 * (1 - weight) + r2 * weight,
    g1 * (1 - weight) + g2 * weight,
    b1 * (1 - weight) + b2 * weight
  );
}

/**
 * Extracts dominant background color, primary dark ink, and vibrant brand accent
 * directly from an uploaded or built-in logo image using an offscreen HTML5 canvas.
 */
export async function extractLogoPalette(imageSrc: string): Promise<ExtractedLogoPalette> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const size = 96;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          throw new Error('Canvas 2D context unavailable');
        }

        // Fill white fallback behind transparent PNGs before reading pixels
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, size, size);
        ctx.drawImage(img, 0, 0, size, size);

        const data = ctx.getImageData(0, 0, size, size).data;

        // 1. Sample perimeter pixels to determine background color
        const bgBuckets = new Map<string, { count: number; r: number; g: number; b: number }>();
        for (let y = 0; y < size; y++) {
          for (let x = 0; x < size; x++) {
            const isEdge = x < 6 || x >= size - 6 || y < 6 || y >= size - 6;
            if (!isEdge) continue;
            const i = (y * size + x) * 4;
            if (data[i + 3] < 128) continue;
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const key = `${Math.round(r / 16)}-${Math.round(g / 16)}-${Math.round(b / 16)}`;
            const entry = bgBuckets.get(key) || { count: 0, r: 0, g: 0, b: 0 };
            entry.count += 1;
            entry.r += r;
            entry.g += g;
            entry.b += b;
            bgBuckets.set(key, entry);
          }
        }

        let bgR = 255;
        let bgG = 255;
        let bgB = 255;
        let bestBgCount = 0;
        for (const bucket of bgBuckets.values()) {
          if (bucket.count > bestBgCount) {
            bestBgCount = bucket.count;
            bgR = bucket.r / bucket.count;
            bgG = bucket.g / bucket.count;
            bgB = bucket.b / bucket.count;
          }
        }

        // Snap near-white backgrounds cleanly to pure white #FFFFFF
        if (bgR > 242 && bgG > 242 && bgB > 242) {
          bgR = 255;
          bgG = 255;
          bgB = 255;
        }
        const backgroundColor = rgbToHex(bgR, bgG, bgB);
        const isLightBackground = getLuminance(bgR, bgG, bgB) > 0.55;

        // 2. Quantize vibrant accent colors & primary ink across entire logo
        const accentBuckets = new Map<
          string,
          { score: number; count: number; r: number; g: number; b: number }
        >();
        const darkBuckets = new Map<
          string,
          { count: number; r: number; g: number; b: number }
        >();

        for (let i = 0; i < data.length; i += 4) {
          if (data[i + 3] < 150) continue;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const lum = getLuminance(r, g, b);
          const sat = getSaturation(r, g, b);

          // Collect dark neutral/navy ink candidates
          if (lum < 0.28 && sat < 0.48) {
            const dk = `${Math.round(r / 14)}-${Math.round(g / 14)}-${Math.round(b / 14)}`;
            const de = darkBuckets.get(dk) || { count: 0, r: 0, g: 0, b: 0 };
            de.count += 1;
            de.r += r;
            de.g += g;
            de.b += b;
            darkBuckets.set(dk, de);
          }

          // Collect vibrant brand colors (ignore pure white/black/muted grays)
          if (sat > 0.35 && lum > 0.16 && lum < 0.88) {
            const ak = `${Math.round(r / 20)}-${Math.round(g / 20)}-${Math.round(b / 20)}`;
            const ae = accentBuckets.get(ak) || { score: 0, count: 0, r: 0, g: 0, b: 0 };
            ae.count += 1;
            ae.score += sat * sat * (lum > 0.3 && lum < 0.72 ? 1.5 : 1);
            ae.r += r;
            ae.g += g;
            ae.b += b;
            accentBuckets.set(ak, ae);
          }
        }

        const sortedAccents = Array.from(accentBuckets.values()).sort((a, b) => b.score - a.score);
        let accR = 255;
        let accG = 107;
        let accB = 0;
        if (sortedAccents.length > 0) {
          const top = sortedAccents[0];
          accR = top.r / top.count;
          accG = top.g / top.count;
          accB = top.b / top.count;
        }
        const accentColor = rgbToHex(accR, accG, accB);
        const accentHoverColor = adjustBrightness(accR, accG, accB, 0.85);

        // Secondary warm/amber highlight
        let amberHighlight = '#FFB703';
        const secondaryBucket = sortedAccents.find((b) => {
          const r = b.r / b.count;
          const g = b.g / b.count;
          const bl = b.b / b.count;
          const dist = Math.hypot(r - accR, g - accG, bl - accB);
          return dist > 45 && b.count >= 6;
        });
        if (secondaryBucket) {
          amberHighlight = rgbToHex(
            secondaryBucket.r / secondaryBucket.count,
            secondaryBucket.g / secondaryBucket.count,
            secondaryBucket.b / secondaryBucket.count
          );
        }

        // Primary ink text color
        let inkR = 13;
        let inkG = 27;
        let inkB = 42;
        if (isLightBackground) {
          const sortedDark = Array.from(darkBuckets.values()).sort((a, b) => b.count - a.count);
          if (sortedDark.length > 0 && sortedDark[0].count > 12) {
            inkR = sortedDark[0].r / sortedDark[0].count;
            inkG = sortedDark[0].g / sortedDark[0].count;
            inkB = sortedDark[0].b / sortedDark[0].count;
          }
        }

        const textColor = isLightBackground ? rgbToHex(inkR, inkG, inkB) : '#F8FAFC';
        const textMutedColor = isLightBackground
          ? mixHex(inkR, inkG, inkB, 113, 128, 150, 0.65)
          : '#94A3B8';

        const surfaceColor = isLightBackground
          ? backgroundColor === '#FFFFFF'
            ? '#F7F8FA'
            : mixHex(bgR, bgG, bgB, 240, 244, 248, 0.6)
          : mixHex(bgR, bgG, bgB, 255, 255, 255, 0.06);

        const surfaceAltColor = isLightBackground
          ? backgroundColor === '#FFFFFF'
            ? '#EDF2F7'
            : mixHex(bgR, bgG, bgB, 226, 232, 240, 0.65)
          : mixHex(bgR, bgG, bgB, 255, 255, 255, 0.03);

        const borderColor = isLightBackground
          ? '#E2E8F0'
          : mixHex(bgR, bgG, bgB, 255, 255, 255, 0.14);

        const theme: ThemeConfig = {
          accentColor,
          accentHoverColor,
          amberHighlight,
          backgroundColor,
          surfaceColor,
          surfaceAltColor,
          borderColor,
          textColor,
          textMutedColor
        };

        resolve({
          theme,
          isLightBackground,
          swatches: [
            { label: 'Background', hex: backgroundColor },
            { label: 'Primary Text', hex: textColor },
            { label: 'Brand Accent', hex: accentColor },
            { label: 'Highlight', hex: amberHighlight },
            { label: 'Card Surface', hex: surfaceColor }
          ]
        });
      } catch (err) {
        reject(err);
      }
    };

    img.onerror = () => reject(new Error('Failed to load logo image for color extraction'));
    img.src = imageSrc;
  });
}
