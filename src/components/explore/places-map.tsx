"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { PlaceLite } from "./place-explorer";

/**
 * Interactive map (OpenStreetMap tiles — requires a connection). Markers link to the offline place cards.
 * This is NOT offline GPS navigation.
 */
export function PlacesMap({ places, locale, label }: { places: PlaceLite[]; locale: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || places.length === 0) return;
    const map = L.map(ref.current, { scrollWheelZoom: false });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const icon = L.divIcon({
      className: "",
      html: '<span style="display:block;width:22px;height:22px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:#075E45;border:3px solid #C5A46D;box-shadow:0 1px 4px rgba(0,0,0,.4)"></span>',
      iconSize: [22, 22],
      iconAnchor: [11, 22],
    });

    const bounds = L.latLngBounds([]);
    for (const p of places) {
      const marker = L.marker([p.latitude, p.longitude], { icon, title: p.name, alt: p.name }).addTo(map);
      const link = document.createElement("a");
      link.href = `/${locale}/explore/${p.id}/`;
      link.textContent = p.name;
      link.style.fontWeight = "700";
      marker.bindPopup(link);
      bounds.extend([p.latitude, p.longitude]);
    }
    map.fitBounds(bounds, { padding: [30, 30], maxZoom: 15 });
    return () => {
      map.remove();
    };
  }, [places, locale]);

  return <div ref={ref} className="h-80 w-full" role="region" aria-label={label} />;
}
