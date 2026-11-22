import {
  CmsDataState,
  MachineProduct,
  QUALITY_COMPLIANCE_STANDARDS,
  TENDER_PACK_CHECKLIST
} from '../data/industrialData';

function escapeHtml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function resolveAbsoluteUrl(src: string): string {
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
    return src;
  }
  return `${window.location.origin}${src.startsWith('/') ? src : `/${src}`}`;
}

function triggerPrintIframe(fullHtml: string): void {
  const existing = document.getElementById('abu-print-iframe');
  if (existing) existing.remove();

  const iframe = document.createElement('iframe');
  iframe.id = 'abu-print-iframe';
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  iframe.setAttribute('aria-hidden', 'true');
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) return;

  doc.open();
  doc.write(fullHtml);
  doc.close();

  const runPrint = () => {
    try {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    } catch {
      // Fallback handled by optional download trigger if browser restricts iframe print
    }
  };

  setTimeout(runPrint, 350);
}

function downloadHtmlFile(filename: string, html: string): void {
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

const PRINT_BASE_CSS = `
  @page { size: A4; margin: 14mm; }
  * { box-sizing: border-box; }
  body {
    font-family: 'Segoe UI', Roboto, Arial, sans-serif;
    color: #0D1B2A;
    margin: 0;
    padding: 0;
    line-height: 1.5;
    background: #FFFFFF;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 3px solid #FF6B00;
    padding-bottom: 14px;
    margin-bottom: 18px;
  }
  .brand-left { display: flex; align-items: center; gap: 14px; }
  .logo { height: 56px; width: auto; object-fit: contain; }
  .company-name { font-size: 20px; font-weight: 800; color: #0D1B2A; text-transform: uppercase; margin: 0; }
  .tagline { font-size: 11px; font-weight: 700; color: #FF6B00; letter-spacing: 0.08em; text-transform: uppercase; margin-top: 2px; }
  .contact-box { text-align: right; font-size: 11px; color: #4A5568; }
  .contact-box strong { color: #0D1B2A; }
  h2.section-title {
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #FF6B00;
    border-bottom: 1px solid #E2E8F0;
    padding-bottom: 5px;
    margin: 18px 0 10px;
  }
  .hero-banner {
    background: #F7F8FA;
    border: 1px solid #E2E8F0;
    border-left: 4px solid #FF6B00;
    padding: 14px;
    border-radius: 6px;
    margin-bottom: 16px;
  }
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin-bottom: 16px;
  }
  .stat-card {
    background: #F7F8FA;
    border: 1px solid #E2E8F0;
    border-radius: 6px;
    padding: 10px;
    text-align: center;
  }
  .stat-val { font-size: 13px; font-weight: 800; color: #0D1B2A; }
  .stat-lbl { font-size: 10px; color: #4A5568; text-transform: uppercase; margin-top: 2px; }
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .card {
    border: 1px solid #E2E8F0;
    background: #F7F8FA;
    border-radius: 6px;
    padding: 12px;
    font-size: 12px;
  }
  .photo-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 8px; }
  .photo-box { border: 1px solid #E2E8F0; border-radius: 6px; overflow: hidden; }
  .photo-box img { width: 100%; height: 115px; object-fit: cover; display: block; }
  .photo-cap { font-size: 10px; padding: 6px; font-weight: 700; color: #0D1B2A; background: #F7F8FA; }
  table { width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 12px; }
  th, td { border: 1px solid #E2E8F0; padding: 8px 10px; text-align: left; }
  th { background: #EDF2F7; font-size: 11px; text-transform: uppercase; color: #0D1B2A; }
  ul { margin: 6px 0; padding-left: 18px; font-size: 12px; }
  li { margin-bottom: 4px; }
  .footer {
    margin-top: 22px;
    padding-top: 10px;
    border-top: 1px solid #E2E8F0;
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    color: #4A5568;
  }
`;

export function generateCompanyProfilePdf(cmsData: CmsDataState, downloadCopy = false): void {
  const { siteIdentity, founder, companyMetrics, projects } = cmsData;
  const logoSrc = resolveAbsoluteUrl(siteIdentity.logoUrl);
  const founderSrc = resolveAbsoluteUrl(founder.photoUrl);
  const heroProjects = projects.slice(0, 3);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(siteIdentity.companyName)} — Company Profile</title>
  <style>${PRINT_BASE_CSS}</style>
</head>
<body>
  <div class="header">
    <div class="brand-left">
      ${logoSrc ? `<img src="${escapeHtml(logoSrc)}" class="logo" alt="Logo" />` : ''}
      <div>
        <h1 class="company-name">${escapeHtml(siteIdentity.companyName)}</h1>
        <div class="tagline">${escapeHtml(siteIdentity.tagline)}</div>
      </div>
    </div>
    <div class="contact-box">
      <div><strong>Call / WhatsApp:</strong> ${escapeHtml(siteIdentity.phoneDisplay)}</div>
      <div><strong>Email:</strong> ${escapeHtml(siteIdentity.email)}</div>
      <div>${escapeHtml(siteIdentity.address)}</div>
      <div>${escapeHtml(siteIdentity.workingHours)}</div>
    </div>
  </div>

  <div class="hero-banner">
    <strong style="font-size:15px;display:block;margin-bottom:4px;">Kenyan Structural Steel Fabrication &amp; Industrial Machinery Specialists</strong>
    <span style="font-size:12px;color:#334155;">
      ${escapeHtml(
        cmsData.sections.find((s) => s.id === 'about')?.body ||
          'Delivering structural steelwork, custom metal fabrication, stone crushing & screening systems, conveyors, and on-site installation support across Kenya and East Africa.'
      )}
    </span>
  </div>

  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-val">${escapeHtml(companyMetrics.countiesServed)}</div>
      <div class="stat-lbl">Delivery Footprint</div>
    </div>
    <div class="stat-card">
      <div class="stat-val">${escapeHtml(companyMetrics.completedProjectsCount)}</div>
      <div class="stat-lbl">Proven Builds</div>
    </div>
    <div class="stat-card">
      <div class="stat-val">${escapeHtml(companyMetrics.onTimeDeliveryRate)}</div>
      <div class="stat-lbl">Schedule Record</div>
    </div>
    <div class="stat-card">
      <div class="stat-val">${escapeHtml(companyMetrics.warrantyPeriod)}</div>
      <div class="stat-lbl">Workmanship Guarantee</div>
    </div>
  </div>

  <div class="two-col">
    <div class="card">
      <h2 class="section-title" style="margin-top:0;">Core Engineering Capabilities</h2>
      <ul>
        <li><strong>Structural Steel Frameworks:</strong> Factory trusses, portals, batching platforms &amp; stairways.</li>
        <li><strong>Custom Metal Fabrication:</strong> Heavy hoppers, discharge chutes, tanks &amp; guarding.</li>
        <li><strong>Quarry &amp; Mining Machinery:</strong> Jaw crushers, vibrating screens, ball mills &amp; conveyors.</li>
        <li><strong>Bespoke Machine Building:</strong> Block molding presses, agro chaff/hammer mills &amp; custom rigs.</li>
        <li><strong>Industrial Repair &amp; Spares:</strong> Re-boring, crack rebuilding, manganese jaw plates &amp; rollers.</li>
      </ul>
    </div>
    <div class="card" style="display:flex;gap:12px;align-items:flex-start;">
      ${
        founderSrc
          ? `<img src="${escapeHtml(founderSrc)}" style="width:90px;height:110px;object-fit:cover;border-radius:4px;border:1px solid #CBD5E1;flex-shrink:0;" alt="Founder" />`
          : ''
      }
      <div>
        <h2 class="section-title" style="margin-top:0;">Leadership &amp; Workshop</h2>
        <div style="font-weight:800;font-size:13px;color:#0D1B2A;">${escapeHtml(founder.name)}</div>
        <div style="font-size:10px;color:#475569;font-weight:600;margin-bottom:2px;">${escapeHtml(founder.role)}</div>
        <div style="font-size:11px;color:#FF6B00;font-weight:700;margin-bottom:4px;">${escapeHtml(founder.experienceYears)}</div>
        <div style="font-size:11px;color:#334155;">${escapeHtml(founder.bioParagraph1)}</div>
      </div>
    </div>
  </div>

  <h2 class="section-title">Featured Kenyan Deployments &amp; Builds</h2>
  <div class="photo-grid">
    ${heroProjects
      .map(
        (p) => `
      <div class="photo-box">
        <img src="${escapeHtml(resolveAbsoluteUrl(p.image))}" alt="${escapeHtml(p.title)}" />
        <div class="photo-cap">${escapeHtml(p.title)}<br/><span style="font-weight:400;color:#FF6B00;">${escapeHtml(p.location)}</span></div>
      </div>`
      )
      .join('')}
  </div>

  <div class="footer">
    <span>Generated by ${escapeHtml(siteIdentity.companyName)} · ${escapeHtml(siteIdentity.address)}</span>
    <span>Call / WhatsApp: ${escapeHtml(siteIdentity.phoneDisplay)} · ${escapeHtml(cmsData.seo.canonicalUrl)}</span>
  </div>
</body>
</html>`;

  if (downloadCopy) {
    downloadHtmlFile('ABU-Fabricators-Company-Profile.html', html);
  }
  triggerPrintIframe(html);
}

export function generateMachineSpecPdf(
  machine: MachineProduct,
  cmsData: CmsDataState,
  downloadCopy = false
): void {
  const { siteIdentity } = cmsData;
  const logoSrc = resolveAbsoluteUrl(siteIdentity.logoUrl);
  const machineSrc = resolveAbsoluteUrl(machine.image);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(machine.name)} — Technical Datasheet</title>
  <style>${PRINT_BASE_CSS}</style>
</head>
<body>
  <div class="header">
    <div class="brand-left">
      ${logoSrc ? `<img src="${escapeHtml(logoSrc)}" class="logo" alt="Logo" />` : ''}
      <div>
        <h1 class="company-name">${escapeHtml(siteIdentity.companyName)}</h1>
        <div class="tagline">TECHNICAL SPECIFICATION SHEET · EMBASAKI, NAIROBI</div>
      </div>
    </div>
    <div class="contact-box">
      <div><strong>Call / WhatsApp:</strong> ${escapeHtml(siteIdentity.phoneDisplay)}</div>
      <div><strong>Email:</strong> ${escapeHtml(siteIdentity.email)}</div>
      <div>${escapeHtml(siteIdentity.address)}</div>
    </div>
  </div>

  <div class="two-col" style="align-items:center;margin-bottom:14px;">
    <div>
      <div style="font-size:11px;font-weight:700;color:#FF6B00;text-transform:uppercase;">${escapeHtml(machine.category)} DIVISION</div>
      <h2 style="font-size:22px;font-weight:800;margin:4px 0 8px;text-transform:uppercase;color:#0D1B2A;">${escapeHtml(machine.name)}</h2>
      <p style="font-size:12px;font-weight:700;color:#1E293B;margin:0 0 6px;">${escapeHtml(machine.tagline)}</p>
      <p style="font-size:12px;color:#4A5568;margin:0;">${escapeHtml(machine.description)}</p>
    </div>
    <div>
      ${
        machineSrc
          ? `<img src="${escapeHtml(machineSrc)}" style="width:100%;max-height:210px;object-fit:cover;border-radius:6px;border:1px solid #CBD5E1;" alt="${escapeHtml(machine.name)}" />`
          : ''
      }
    </div>
  </div>

  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-val">${escapeHtml(machine.capacityRange)}</div>
      <div class="stat-lbl">Capacity Range</div>
    </div>
    <div class="stat-card">
      <div class="stat-val">${escapeHtml(machine.feedSizeMax)}</div>
      <div class="stat-lbl">Max Feed / Envelope</div>
    </div>
    <div class="stat-card">
      <div class="stat-val">${escapeHtml(machine.powerRange)}</div>
      <div class="stat-lbl">Drive Power</div>
    </div>
    <div class="stat-card">
      <div class="stat-val">12 Months</div>
      <div class="stat-lbl">Structural Warranty</div>
    </div>
  </div>

  <h2 class="section-title">Technical Engineering Parameters</h2>
  <table>
    <thead>
      <tr>
        <th style="width:38%;">Parameter</th>
        <th>Specification Value</th>
      </tr>
    </thead>
    <tbody>
      ${machine.specs
        .map(
          (s) => `
        <tr>
          <td><strong>${escapeHtml(s.label)}</strong></td>
          <td>${escapeHtml(s.value)}</td>
        </tr>`
        )
        .join('')}
      <tr>
        <td><strong>Workshop Pre-Testing &amp; Spares</strong></td>
        <td>Dry &amp; load trial run at Fedha Road, Embakasi · Local wear spares stocked in Nairobi</td>
      </tr>
    </tbody>
  </table>

  <div class="two-col" style="margin-top:14px;">
    <div class="card">
      <h2 class="section-title" style="margin-top:0;">Key Engineering Advantages</h2>
      <ul>
        ${machine.advantages.map((a) => `<li>${escapeHtml(a)}</li>`).join('')}
      </ul>
    </div>
    <div class="card">
      <h2 class="section-title" style="margin-top:0;">Typical Kenyan Applications</h2>
      <ul>
        ${machine.applications.map((a) => `<li>${escapeHtml(a)}</li>`).join('')}
      </ul>
      <div style="margin-top:8px;font-size:11px;color:#4A5568;"><strong>Maintenance:</strong> ${escapeHtml(machine.maintenanceNotes)}</div>
    </div>
  </div>

  <div class="footer">
    <span>${escapeHtml(siteIdentity.companyName)} · ${escapeHtml(siteIdentity.address)}</span>
    <span>Direct Quote Desk: ${escapeHtml(siteIdentity.phoneDisplay)}</span>
  </div>
</body>
</html>`;

  if (downloadCopy) {
    downloadHtmlFile(`${machine.id}-spec-sheet.html`, html);
  }
  triggerPrintIframe(html);
}

export function generateTenderCapabilityDossierPdf(
  cmsData: CmsDataState,
  tenderReference = '',
  organizationName = '',
  downloadCopy = true
): void {
  const { siteIdentity, companyMetrics } = cmsData;
  const logoSrc = resolveAbsoluteUrl(siteIdentity.logoUrl);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(siteIdentity.companyName)} — Tender &amp; Pre-Qualification Dossier</title>
  <style>${PRINT_BASE_CSS}</style>
</head>
<body>
  <div class="header">
    <div class="brand-left">
      ${logoSrc ? `<img src="${escapeHtml(logoSrc)}" class="logo" alt="Logo" />` : ''}
      <div>
        <h1 class="company-name">${escapeHtml(siteIdentity.companyName)}</h1>
        <div class="tagline">OFFICIAL TENDER CAPABILITY &amp; QA COMPLIANCE DOSSIER</div>
      </div>
    </div>
    <div class="contact-box">
      <div><strong>Call / WhatsApp:</strong> ${escapeHtml(siteIdentity.phoneDisplay)}</div>
      <div><strong>Email:</strong> ${escapeHtml(siteIdentity.email)}</div>
      <div>${escapeHtml(siteIdentity.address)}</div>
      <div>Generated: ${escapeHtml(new Date().toISOString().slice(0, 10))}</div>
    </div>
  </div>

  ${
    tenderReference || organizationName
      ? `<div class="hero-banner">
          <div style="font-size:11px;font-weight:700;color:#FF6B00;text-transform:uppercase;">Prepared For Tender / Procurement Submission</div>
          ${organizationName ? `<div style="font-size:14px;font-weight:800;margin-top:2px;">Client / Procuring Entity: ${escapeHtml(organizationName)}</div>` : ''}
          ${tenderReference ? `<div style="font-size:12px;color:#334155;margin-top:2px;">Tender / RFQ Reference: <strong>${escapeHtml(tenderReference)}</strong></div>` : ''}
        </div>`
      : ''
  }

  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-val">${escapeHtml(companyMetrics.countiesServed)}</div>
      <div class="stat-lbl">Kenyan Delivery Reach</div>
    </div>
    <div class="stat-card">
      <div class="stat-val">${escapeHtml(companyMetrics.completedProjectsCount)}</div>
      <div class="stat-lbl">Completed Structures</div>
    </div>
    <div class="stat-card">
      <div class="stat-val">BS EN 10025</div>
      <div class="stat-lbl">Structural Grade Spec</div>
    </div>
    <div class="stat-card">
      <div class="stat-val">${escapeHtml(companyMetrics.warrantyPeriod)}</div>
      <div class="stat-lbl">Contract Warranty</div>
    </div>
  </div>

  <h2 class="section-title">1. Procurement &amp; Tender Pre-Qualification Checklist</h2>
  <table>
    <thead>
      <tr>
        <th style="width:42%;">Compliance Item</th>
        <th style="width:20%;">Status</th>
        <th>Notes / Verification</th>
      </tr>
    </thead>
    <tbody>
      ${TENDER_PACK_CHECKLIST.map(
        (item) => `
        <tr>
          <td><strong>${escapeHtml(item.documentTitle)}</strong></td>
          <td style="color:#047857;font-weight:700;">${escapeHtml(item.statusLabel)}</td>
          <td>${escapeHtml(item.notes)}</td>
        </tr>`
      ).join('')}
    </tbody>
  </table>

  <h2 class="section-title">2. Engineering Quality Assurance, Weld Inspection &amp; Safety Standards</h2>
  <div class="two-col">
    ${QUALITY_COMPLIANCE_STANDARDS.map(
      (qa) => `
      <div class="card" style="margin-bottom:10px;">
        <div style="font-size:10px;font-weight:700;color:#FF6B00;">${escapeHtml(qa.code)}</div>
        <div style="font-size:13px;font-weight:800;color:#0D1B2A;margin:2px 0 4px;">${escapeHtml(qa.title)}</div>
        <div style="font-size:11px;color:#4A5568;margin-bottom:6px;">${escapeHtml(qa.summary)}</div>
        <ul>
          ${qa.checkpoints.map((cp) => `<li>${escapeHtml(cp)}</li>`).join('')}
        </ul>
      </div>`
    ).join('')}
  </div>

  <div class="footer">
    <span>${escapeHtml(siteIdentity.companyName)} · Fedha Road, Embakasi, Nairobi</span>
    <span>Procurement &amp; Stamped Documents Desk: ${escapeHtml(siteIdentity.phoneDisplay)}</span>
  </div>
</body>
</html>`;

  if (downloadCopy) {
    downloadHtmlFile('ABU-Fabricators-Tender-Capability-Dossier.html', html);
  }
  triggerPrintIframe(html);
}
