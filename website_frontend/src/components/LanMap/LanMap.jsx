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

function MapFlyController({ selectedMarker, markers, markerRefs }) {
    const map = useMap();
    useEffect(() => {
        if (selectedMarker === null) return;
        const m = markers[selectedMarker];
        if (!m) return;
        map.flyTo([m.lat, m.lng], Math.max(map.getZoom(), 8), { duration: 0.8 });
        const timer = setTimeout(() => {
            markerRefs.current[selectedMarker]?.openPopup();
        }, 850);
        return () => clearTimeout(timer);
    }, [selectedMarker]); // eslint-disable-line react-hooks/exhaustive-deps
    return null;
}

function ListPanelControl({ legendGames, filteredMarkers, listOpen, setListOpen, handleListSelect }) {
    const map = useMap();
    const [el] = useState(() => {
        const div = document.createElement('div');
        div.className = 'lanMapListPortal';
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

    return createPortal(
        <div className={`lanMapListPanel${listOpen ? ' open' : ''}`}>
            <button
                className="lanMapListToggle"
                onClick={() => setListOpen(o => !o)}
                title={listOpen ? 'Close list' : 'Browse events'}
            >
                {listOpen
                    ? <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="1" y1="1" x2="12" y2="12"/><line x1="12" y1="1" x2="1" y2="12"/></svg>
                    : <svg width="15" height="13" viewBox="0 0 15 13" fill="currentColor"><rect y="0" width="15" height="2" rx="1"/><rect y="5.5" width="15" height="2" rx="1"/><rect y="11" width="15" height="2" rx="1"/></svg>
                }
            </button>

            {listOpen && (
                <div className="lanMapListContent">
                    {legendGames.map(g => {
                        const gameMarkers = filteredMarkers
                            .map((m, i) => ({ m, i }))
                            .filter(({ m }) => (m.game || 'Conventions') === g);
                        if (!gameMarkers.length) return null;
                        return (
                            <div key={g} className="lanMapListGroup">
                                <div className="lanMapListGameHeader">
                                    <span
                                        className="lanMapListDot"
                                        style={{ backgroundColor: getColor(g) }}
                                    />
                                    {GAME_LABELS[g]}
                                </div>
                                {gameMarkers.map(({ m, i }) => (
                                    <button
                                        key={i}
                                        className="lanMapListItem"
                                        onClick={() => handleListSelect(i)}
                                    >
                                        {m.name}
                                    </button>
                                ))}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>,
        el
    );
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
    const [listOpen, setListOpen] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const markerRefs = useRef([]);
    const touch = isTouchDevice();

    const legendGames = showAllGames
        ? GAME_ORDER
        : game
            ? [game]
            : GAME_ORDER.filter(g => markers.some(m => (m.game || 'Conventions') === g));

    const [activeGames, setActiveGames] = useState(() => new Set(legendGames));

    useEffect(() => {
        setSelectedMarker(null);
        markerRefs.current = [];
    }, [activeGames]);

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

    const handleListSelect = (idx) => {
        setSelectedMarker(idx);
        setListOpen(false);
    };

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
                {touch && <MobileDraggingController enabled={mobileActivated} />}
                <MapFlyController
                    selectedMarker={selectedMarker}
                    markers={filteredMarkers}
                    markerRefs={markerRefs}
                />
                <ListPanelControl
                    legendGames={legendGames}
                    filteredMarkers={filteredMarkers}
                    listOpen={listOpen}
                    setListOpen={setListOpen}
                    handleListSelect={handleListSelect}
                />
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
                        ref={el => { markerRefs.current[i] = el; }}
                    >
                        <Popup>
                            <strong>{marker.name}</strong>
                            <div
                                className="lanMapPopupGame"
                                style={{
                                    color: getColor(marker.game || 'Conventions'),
                                    borderColor: getColor(marker.game || 'Conventions'),
                                    backgroundColor: getColor(marker.game || 'Conventions') + '22',
                                }}
                            >
                                <span
                                    className="lanMapPopupGameDot"
                                    style={{ backgroundColor: getColor(marker.game || 'Conventions') }}
                                />
                                {GAME_LABELS[marker.game || 'Conventions']}
                            </div>
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
