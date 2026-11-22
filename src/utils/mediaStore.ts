// IndexedDB-backed Media Library for persistent Image & Video uploads
// (logos, product photos, portfolio photos, founder portrait, background images, and workshop videos)

export interface MediaAsset {
  id: string;
  name: string;
  dataUrl: string;
  mediaType?: 'image' | 'video';
  mimeType?: string;
  blob?: Blob;
  category: 'logo' | 'product' | 'project' | 'workshop' | 'general';
  createdAt: number;
}

const DB_NAME = 'abu_fabricators_cms_media';
const STORE_NAME = 'media_assets';
const DB_VERSION = 2;

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function getAllMediaAssets(): Promise<MediaAsset[]> {
  try {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => {
        const rawItems = (req.result as MediaAsset[]) || [];
        const items = rawItems.map((item) => {
          const isVideo =
            item.mediaType === 'video' ||
            item.mimeType?.startsWith('video/') ||
            /\.(mp4|webm|mov|m4v)(\?|$)/i.test(item.name);

          if (isVideo && item.blob instanceof Blob) {
            return {
              ...item,
              mediaType: 'video' as const,
              dataUrl: URL.createObjectURL(item.blob)
            };
          }
          return {
            ...item,
            mediaType: (isVideo ? 'video' : 'image') as 'image' | 'video'
          };
        });
        items.sort((a, b) => b.createdAt - a.createdAt);
        resolve(items);
      };
      req.onerror = () => reject(req.error);
    });
  } catch {
    return [];
  }
}

export async function saveMediaAsset(asset: MediaAsset): Promise<void> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.put(asset);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export async function deleteMediaAsset(id: string): Promise<void> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

// Helper to compress and convert uploaded image File to Data URL
export function readAndCompressImageFile(file: File, maxDimension = 1600): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.onload = () => {
      const result = reader.result as string;
      // Keep SVG or small PNG/JPG intact if under 350KB
      if (file.type === 'image/svg+xml' || file.size < 350 * 1024) {
        resolve(result);
        return;
      }
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(result);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        // Preserve PNG alpha if PNG, otherwise JPEG at 0.86 quality
        const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        resolve(canvas.toDataURL(outputType, 0.86));
      };
      img.onerror = () => resolve(result);
      img.src = result;
    };
    reader.readAsDataURL(file);
  });
}

export async function prepareMediaUpload(file: File): Promise<{
  dataUrl: string;
  mediaType: 'image' | 'video';
  mimeType: string;
  blob?: Blob;
}> {
  const isVideo =
    file.type.startsWith('video/') || /\.(mp4|webm|mov|m4v|ogg)$/i.test(file.name);

  if (isVideo) {
    const objectUrl = URL.createObjectURL(file);
    return {
      dataUrl: objectUrl,
      mediaType: 'video',
      mimeType: file.type || 'video/mp4',
      blob: file
    };
  }

  const dataUrl = await readAndCompressImageFile(file);
  return {
    dataUrl,
    mediaType: 'image',
    mimeType: file.type || 'image/jpeg'
  };
}
