import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Link } from 'react-router';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './LanMap.css';

const GAME_COLORS = {
    'CoD':         '#3a7bd5',
    'LoL':         '#962d2d',
    'Halo':        '#8e6ace',
    'Warzone':     '#2ea855',
    'Conventions': '#e07b27',
};

const GAME_LABELS = {
    'CoD':         'Call of Duty',
    'LoL':         'League of Legends',
    'Halo':        'Halo',
    'Warzone':     'Warzone',
    'Conventions': 'Other',
};

const GAME_ORDER = ['CoD', 'LoL', 'Halo', 'Warzone', 'Conventions'];

function getColor(game) {
    return GAME_COLORS[game] || GAME_COLORS['Conventions'];
}

function createMarkerIcon(game) {
    const color = getColor(game);
    return L.divIcon({
        className: '',
        html: `<div class="lanMarkerDot" style="background-color:${color};box-shadow:0 0 8px ${color}99"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
        popupAnchor: [0, -12],
    });
}

function CtrlScrollZoom() {
    const map = useMap();
    useEffect(() => {
        const container = map.getContainer();

        const overlay = document.createElement('div');
        overlay.className = 'lanMapScrollOverlay';
        overlay.textContent = 'Use Ctrl + scroll to zoom';
        overlay.style.opacity = '0';
        container.appendChild(overlay);

        let hideTimer = null;
        let warned = false;

        const show = () => { overlay.style.opacity = '1'; };
        const hide = () => { overlay.style.opacity = '0'; warned = false; };

        const onWheel = (e) => {
            if (e.ctrlKey) {
                e.preventDefault();
                e.deltaY < 0 ? map.zoomIn() : map.zoomOut();
            } else if (!warned) {
                e.preventDefault();
                warned = true;
                show();
                clearTimeout(hideTimer);
                hideTimer = setTimeout(hide, 1500);
            }
        };

        container.addEventListener('wheel', onWheel, { passive: false, capture: true });
        return () => {
            container.removeEventListener('wheel', onWheel, { capture: true });
            clearTimeout(hideTimer);
            if (container.contains(overlay)) container.removeChild(overlay);
        };
    }, [map]);
    return null;
}

export const LanMap = ({ markers = [], className = 'lanMap', game = null }) => {
    const legendGames = game
        ? [game]
        : GAME_ORDER.filter(g => markers.some(m => (m.game || 'Conventions') === g));

    return (
        <div className="lanMapWithLegend">
            <MapContainer
                center={[39.5, -98.35]}
                zoom={4}
                className={className}
                scrollWheelZoom={false}
            >
                <CtrlScrollZoom />
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />
                {markers.map((marker, i) => (
                    <Marker key={i} position={[marker.lat, marker.lng]} icon={createMarkerIcon(marker.game)}>
                        <Popup>
                            <strong>{marker.name}</strong>
                            {marker.link && <Link to={marker.link}>More Info →</Link>}
                            <a
                                href={`https://www.google.com/maps/dir/?api=1&destination=${marker.lat},${marker.lng}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >Get Directions →</a>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            <div className="lanMapLegend">
                {legendGames.map(g => (
                    <span key={g} className="lanMapLegendItem">
                        <span
                            className="lanMapLegendDot"
                            style={{ backgroundColor: getColor(g) }}
                        />
                        {GAME_LABELS[g]}
                    </span>
                ))}
            </div>
        </div>
    );
};
