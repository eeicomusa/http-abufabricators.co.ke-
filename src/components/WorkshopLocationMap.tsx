import React, { useState } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useAdvancedMarkerRef
} from '@vis.gl/react-google-maps';
import { MapPin, Navigation, Phone, Layers, RotateCcw } from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface LatLngLiteral {
  lat: number;
  lng: number;
}

// ABU Fabricators Workshop Location: Fedha Road, Embakasi, opposite Nairobi Gospel Church
const WORKSHOP_POSITION: LatLngLiteral = {
  lat: -1.3189,
  lng: 36.8975
};

const LANDMARK_POINTS: Record<
  string,
  { label: string; subtitle: string; position: LatLngLiteral; zoom: number }
> = {
  workshop: {
    label: 'ABU Workshop Yard',
    subtitle: 'Fedha Rd, Embakasi (Opposite Nairobi Gospel Church)',
    position: WORKSHOP_POSITION,
    zoom: 16
  },
  corridor: {
    label: 'Embakasi / Outering Link',
    subtitle: 'Access corridor from Outering Rd & Mombasa Rd',
    position: { lat: -1.3175, lng: 36.8938 },
    zoom: 15
  }
};

const WorkshopMarkerContent: React.FC = () => {
  const { cmsData } = useCms();
  const { siteIdentity } = cmsData;
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoOpen, setInfoOpen] = useState(true);

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${WORKSHOP_POSITION.lat},${WORKSHOP_POSITION.lng}`;

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={WORKSHOP_POSITION}
        title={siteIdentity.companyName}
        onClick={() => setInfoOpen((prev) => !prev)}
      >
        <Pin
          background={cmsData.theme.accentColor || '#FF6B00'}
          borderColor="#0D1B2A"
          glyphColor="#FFFFFF"
          scale={1.25}
        />
      </AdvancedMarker>

      {infoOpen && (
        <InfoWindow
          anchor={marker}
          maxWidth={270}
          onCloseClick={() => setInfoOpen(false)}
        >
          <div className="p-1 text-[#0D1B2A] space-y-1.5 font-sans">
            <div className="text-[10px] font-mono font-bold uppercase text-[#FF6B00]">
              FABRICATION WORKSHOP
            </div>
            <div className="text-xs font-extrabold uppercase leading-tight">
              {siteIdentity.companyName}
            </div>
            <div className="text-[11px] text-slate-600 leading-snug">
              {siteIdentity.address}
            </div>
            <div className="text-[11px] font-mono font-bold text-[#0D1B2A]">
              Tel: {siteIdentity.phoneDisplay}
            </div>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-1 px-2.5 py-1 bg-[#FF6B00] text-white rounded text-[11px] font-mono font-bold no-underline"
            >
              <span>Navigate via Google Maps</span>
            </a>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export const WorkshopLocationMap: React.FC = () => {
  const { cmsData } = useCms();
  const { siteIdentity } = cmsData;
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;

  const [mapCenter, setMapCenter] = useState<LatLngLiteral>(WORKSHOP_POSITION);
  const [mapZoom, setMapZoom] = useState<number>(16);
  const [mapTypeId, setMapTypeId] = useState<'roadmap' | 'hybrid'>('roadmap');

  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    siteIdentity.address
  )}`;
  const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${WORKSHOP_POSITION.lat},${WORKSHOP_POSITION.lng}`;

  const handleFocusPoint = (key: string) => {
    const pt = LANDMARK_POINTS[key];
    if (!pt) return;
    setMapCenter({ ...pt.position });
    setMapZoom(pt.zoom);
  };

  return (
    <div
      className="border rounded-lg overflow-hidden shadow-sm flex flex-col"
      style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
    >
      {/* Interactive Toolbar Header */}
      <div
        className="p-4 sm:p-5 border-b flex flex-wrap items-center justify-between gap-3"
        style={{ borderColor: 'var(--abu-border)' }}
      >
        <div>
          <span className="text-[11px] font-mono uppercase text-[var(--abu-accent)] font-bold flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            <span>INTERACTIVE WORKSHOP MAP · FEDHA ROAD, EMBAKASI</span>
          </span>
          <h3 className="text-lg sm:text-xl font-heading font-bold text-[var(--abu-text)] uppercase mt-0.5">
            Opposite Nairobi Gospel Church, Nairobi
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => handleFocusPoint('workshop')}
            className="px-2.5 py-1.5 border rounded text-[11px] font-mono font-bold text-[var(--abu-text)] hover:border-[var(--abu-accent)] flex items-center gap-1 cursor-pointer"
            style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
            title="Recenter on Workshop"
          >
            <RotateCcw className="w-3 h-3 text-[var(--abu-accent)]" />
            <span>Recenter</span>
          </button>

          <button
            type="button"
            onClick={() => setMapTypeId((prev) => (prev === 'roadmap' ? 'hybrid' : 'roadmap'))}
            className="px-2.5 py-1.5 border rounded text-[11px] font-mono font-bold text-[var(--abu-text)] hover:border-[var(--abu-accent)] flex items-center gap-1 cursor-pointer"
            style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
          >
            <Layers className="w-3 h-3 text-[var(--abu-accent)]" />
            <span>{mapTypeId === 'roadmap' ? 'Satellite' : 'Street Map'}</span>
          </button>

          <a
            href={mapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-[var(--abu-accent)] hover:bg-[var(--abu-accent-hover)] text-white rounded text-[11px] font-mono font-bold flex items-center gap-1.5 transition-colors"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Get Directions</span>
          </a>
        </div>
      </div>

      {/* Quick Landmark Pills */}
      <div
        className="px-4 py-2.5 border-b flex flex-wrap items-center gap-2 text-[11px] font-mono"
        style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
      >
        <span className="text-[var(--abu-text-muted)] uppercase text-[10px]">Quick Jump:</span>
        {Object.keys(LANDMARK_POINTS).map((key) => {
          const item = LANDMARK_POINTS[key];
          return (
            <button
              key={key}
              type="button"
              onClick={() => handleFocusPoint(key)}
              className="px-2.5 py-1 rounded border text-[11px] text-[var(--abu-text)] hover:border-[var(--abu-accent)] cursor-pointer transition-colors"
              style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
            >
              {item.label}
            </button>
          );
        })}
        <a
          href={`tel:${siteIdentity.phoneRaw}`}
          className="ml-auto inline-flex items-center gap-1 text-[var(--abu-accent)] font-bold hover:underline"
        >
          <Phone className="w-3 h-3" />
          <span>{siteIdentity.phoneDisplay}</span>
        </a>
      </div>

      {/* Map Canvas Container with Explicit Height */}
      <div className="w-full h-[360px] sm:h-[420px] relative bg-slate-100">
        {apiKey ? (
          <APIProvider apiKey={apiKey} libraries={['marker']} language="en" region="KE">
            <Map
              mapId="DEMO_MAP_ID"
              center={mapCenter}
              zoom={mapZoom}
              onCenterChanged={(ev) => setMapCenter(ev.detail.center)}
              onZoomChanged={(ev) => setMapZoom(ev.detail.zoom)}
              mapTypeId={mapTypeId}
              gestureHandling="cooperative"
              internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
              style={{ width: '100%', height: '100%' }}
            >
              <WorkshopMarkerContent />
            </Map>
          </APIProvider>
        ) : (
          <iframe
            title="ABU Fabricators and Services K. Limited - Fedha Road, Embakasi, Nairobi"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(
              siteIdentity.address
            )}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        )}
      </div>

      <div
        className="px-4 py-2.5 text-[11px] font-mono text-[var(--abu-text-muted)] flex flex-wrap items-center justify-between gap-2 border-t"
        style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
      >
        <span>Landmark: Directly on Fedha Road, Embakasi, opposite Nairobi Gospel Church</span>
        <a
          href={mapsSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--abu-accent)] font-bold hover:underline"
        >
          Open Full Map →
        </a>
      </div>
    </div>
  );
};
