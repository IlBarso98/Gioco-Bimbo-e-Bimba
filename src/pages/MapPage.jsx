import { motion } from "framer-motion";
import L from "leaflet";
import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MapViewportController from "../components/MapViewportController";
import PlaceholderMedia from "../components/PlaceholderMedia";
import SectionTitle from "../components/SectionTitle";
import { mapPlaces } from "../data/mapPlaces";
import { siteContent } from "../data/siteContent";
import { formatLongDate } from "../utils/date";

const heartIcon = L.divIcon({
  className: "heart-marker-wrapper",
  html: '<div class="heart-marker" aria-hidden="true">&#10084;</div>',
  iconAnchor: [16, 32],
  iconSize: [32, 32],
  popupAnchor: [0, -24]
});

const sortedPlaces = [...mapPlaces].sort((first, second) => {
  return new Date(first.date) - new Date(second.date);
});

const mappablePlaces = sortedPlaces.filter(
  (place) =>
    Array.isArray(place.coordinates) &&
    place.coordinates.length === 2 &&
    place.coordinates.every((value) => typeof value === "number")
);

function MapPage() {
  const [selectedPlaceId, setSelectedPlaceId] = useState(mappablePlaces[0]?.id ?? null);

  if (sortedPlaces.length === 0 || mappablePlaces.length === 0) {
    return (
      <div className="page-section">
        <section className="glass-card empty-state">
          <SectionTitle eyebrow="Mappa" intro={siteContent.mapIntro} title={siteContent.mapTitle} />
          <p>{siteContent.mapEmptyMessage}</p>
        </section>
      </div>
    );
  }

  const selectedPlace =
    mappablePlaces.find((place) => place.id === selectedPlaceId) ?? mappablePlaces[0];

  return (
    <div className="page-section">
      <section className="section-block">
        <SectionTitle eyebrow="Mappa" intro={siteContent.mapIntro} title={siteContent.mapTitle} />
        <div className="map-layout">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="glass-card map-card"
            initial={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.5 }}
          >
            <div className="map-frame">
              <MapContainer center={selectedPlace.coordinates} scrollWheelZoom={false} zoom={6}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapViewportController coordinates={selectedPlace.coordinates} />
                {mappablePlaces.map((place) => (
                  <Marker
                    eventHandlers={{
                      click: () => setSelectedPlaceId(place.id)
                    }}
                    icon={heartIcon}
                    key={place.id}
                    position={place.coordinates}
                  >
                    <Popup>
                      <article className="popup-card">
                        <div className="popup-text">
                          <p className="popup-date">{formatLongDate(place.date)}</p>
                          <h3>{place.name}</h3>
                          <p>{place.description}</p>
                        </div>
                        {place.image ? (
                          <PlaceholderMedia
                            alt={`Foto di ${place.name}`}
                            aspectRatio="4 / 3"
                            className="popup-photo"
                            label="Aggiungi qui la foto del luogo"
                            src={place.image}
                          />
                        ) : null}
                      </article>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </motion.div>

          <motion.aside
            animate={{ opacity: 1, y: 0 }}
            className="glass-card timeline-card"
            initial={{ opacity: 0, y: 24 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <p className="eyebrow">Timeline dei luoghi</p>
            <ul className="timeline-list">
              {sortedPlaces.map((place) => {
                const isActive = place.id === selectedPlace.id;
                const hasCoordinates =
                  Array.isArray(place.coordinates) &&
                  place.coordinates.length === 2 &&
                  place.coordinates.every((value) => typeof value === "number");

                return (
                  <li className="timeline-item" key={place.id}>
                    <button
                      className={`timeline-button ${isActive ? "is-active" : ""} ${!hasCoordinates ? "is-disabled" : ""}`}
                      disabled={!hasCoordinates}
                      onClick={() => setSelectedPlaceId(place.id)}
                      type="button"
                    >
                      <span className="timeline-name">{place.name}</span>
                      <span className="timeline-meta">
                        {place.area} · {formatLongDate(place.date)}
                      </span>
                      <span className="timeline-description">{place.description}</span>
                      {!hasCoordinates ? (
                        <span className="timeline-meta">Posizione da aggiungere</span>
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.aside>
        </div>
      </section>
    </div>
  );
}

export default MapPage;
