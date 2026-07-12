import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Link } from 'react-router';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './LanMap.css';

const GAME_COLORS = {
    'CoD':         '#3a7bd5',
    'LoL':         '#962d2d',
    'Halo':        '#eee242',
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

const isTouchDevice = () =>
    typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

function ClickFlyController({ target }) {
    const map = useMap();
    const prevRef = useRef(null);
    useEffect(() => {
        if (!target) return;
        if (prevRef.current === target) return;
        prevRef.current = target;
        map.flyTo([target.lat, target.lng], Math.max(map.getZoom(), 10), { duration: 0.6 });
    }, [target]); // eslint-disable-line react-hooks/exhaustive-deps
    return null;
}

function MobileDraggingController({ enabled }) {
    const map = useMap();
    useEffect(() => {
        if (enabled) {
            map.dragging.enable();
        } else {
            map.dragging.disable();
        }
    }, [map, enabled]);
    return null;
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

function LegendControl({ legendGames, activeGames, toggleGame }) {
    const map = useMap();
    const [el] = useState(() => {
        const div = document.createElement('div');
        div.className = 'lanMapLegendPortal';
        return div;
    });

    useEffect(() => {
        const container = map.getContainer();
        container.appendChild(el);
        L.DomEvent.disableClickPropagation(el);
        L.DomEvent.disableScrollPropagation(el);
        return () => {
            if (container.contains(el)) container.removeChild(el);
        };
    }, [map, el]);

    const allActive = legendGames.every(g => activeGames.has(g));

    return createPortal(
        <div className="lanMapLegend">
            <button
                className="lanMapLegendChip lanMapLegendAll active"
                onClick={() => toggleGame('__all__')}
            >
                {allActive ? 'Deselect All' : 'Select All'}
            </button>
            {legendGames.map(g => {
                const isActive = activeGames.has(g);
                const color = getColor(g);
                return (
                    <button
                        key={g}
                        className={`lanMapLegendChip ${isActive ? 'active' : 'inactive'}`}
                        style={isActive ? { borderColor: color, boxShadow: `0 0 10px ${color}55` } : {}}
                        onClick={() => toggleGame(g)}
                    >
                        <span
                            className="lanMapLegendDot"
                            style={{ backgroundColor: isActive ? color : '#555' }}
                        />
                        {GAME_LABELS[g]}
                    </button>
                );
            })}
        </div>,
        el
    );
}

export const LanMap = ({ markers = [], className = 'lanMap', game = null, showAllGames = false }) => {
    const [mobileActivated, setMobileActivated] = useState(false);
    const touch = isTouchDevice();

    const legendGames = showAllGames
        ? GAME_ORDER
        : game
            ? [game]
            : GAME_ORDER.filter(g => markers.some(m => (m.game || 'Conventions') === g));

    const [activeGames, setActiveGames] = useState(() => new Set(legendGames));

    const toggleGame = (g) => {
        if (g === '__all__') {
            setActiveGames(prev => {
                const allActive = legendGames.every(x => prev.has(x));
                return allActive ? new Set() : new Set(legendGames);
            });
            return;
        }
        setActiveGames(prev => {
            const next = new Set(prev);
            if (next.has(g)) {
                next.delete(g);
            } else {
                next.add(g);
            }
            return next;
        });
    };

    const filteredMarkers = markers.filter(m => activeGames.has(m.game || 'Conventions'));
    const [clickTarget, setClickTarget] = useState(null);

    return (
        <div className="lanMapWrapper">
            <MapContainer
                center={[39.5, -98.35]}
                zoom={4}
                className={className}
                scrollWheelZoom={false}
                dragging={!touch}
            >
                <CtrlScrollZoom />
                <ClickFlyController target={clickTarget} />
                {touch && <MobileDraggingController enabled={mobileActivated} />}
                <LegendControl
                    legendGames={legendGames}
                    activeGames={activeGames}
                    toggleGame={toggleGame}
                />
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />
                {filteredMarkers.map((marker, i) => (
                    <Marker
                        key={i}
                        position={[marker.lat, marker.lng]}
                        icon={createMarkerIcon(marker.game)}
                        eventHandlers={{ click: () => setClickTarget(marker) }}
                    >
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

            {touch && !mobileActivated && (
                <div className="lanMapTapOverlay" onClick={() => setMobileActivated(true)}>
                    Tap to interact with the map
                </div>
            )}
        </div>
    );
};
