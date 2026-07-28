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

// Stable identity for a marker — used as the React key, the ref-map key, and
// the selection id. Falls back to coordinates when a marker has no link.
const markerId = (m) => m.link ?? `${m.lat},${m.lng}`;

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

const DEFAULT_CENTER = [39.5, -98.35];
const DEFAULT_ZOOM = 4;

function SelectionController({ selected, setSelected, markersById, markerRefs }) {
    const map = useMap();

    // Keep the latest selection readable inside the popup handler (subscribed
    // once) without re-binding the listener on every selection change.
    const selectedRef = useRef(selected);
    useEffect(() => { selectedRef.current = selected; }, [selected]);

    // Recenter to the default view only when the user closes the *currently
    // selected* event's popup. A popup that closes because we're switching to a
    // different event (its marker no longer matches the selection) is ignored,
    // so it can't interrupt the new fly-in.
    useEffect(() => {
        const onClose = (e) => {
            const sel = selectedRef.current;
            const selMarker = sel ? markerRefs.current.get(sel.id) : null;
            if (!selMarker || e.popup._source !== selMarker) return;
            setSelected(null);
            map.flyTo(DEFAULT_CENTER, DEFAULT_ZOOM, { duration: 0.6 });
        };
        map.on('popupclose', onClose);
        return () => map.off('popupclose', onClose);
    }, [map, setSelected, markerRefs]);

    // On each selection, fly to the marker — Leaflet's flyTo naturally arcs
    // out-and-in between distant points — then open its popup once movement
    // settles. The nonce on `selected` means re-picking the same event re-fires.
    useEffect(() => {
        if (!selected) return;
        const m = markersById.get(selected.id);
        if (!m) return;
        const openPopup = () => markerRefs.current.get(selected.id)?.openPopup();
        map.once('moveend', openPopup);
        map.flyTo([m.lat, m.lng], Math.max(map.getZoom(), 8), { duration: 0.8 });
        return () => map.off('moveend', openPopup);
    }, [selected]); // eslint-disable-line react-hooks/exhaustive-deps

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
                            .filter(m => (m.game || 'Conventions') === g);
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
                                {gameMarkers.map(m => (
                                    <button
                                        key={markerId(m)}
                                        className="lanMapListItem"
                                        onClick={() => handleListSelect(markerId(m))}
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
    const [selected, setSelected] = useState(null); // { id, nonce } | null
    const markerRefs = useRef(new Map());
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
    const markersById = new Map(filteredMarkers.map(m => [markerId(m), m]));

    const handleListSelect = (id) => {
        setSelected({ id, nonce: Date.now() });
        setListOpen(false);
    };

    return (
        <div className="lanMapWrapper">
            <MapContainer
                center={DEFAULT_CENTER}
                zoom={DEFAULT_ZOOM}
                className={className}
                scrollWheelZoom={false}
                dragging={!touch}
            >
                <CtrlScrollZoom />
                {touch && <MobileDraggingController enabled={mobileActivated} />}
                <SelectionController
                    selected={selected}
                    setSelected={setSelected}
                    markersById={markersById}
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
                    // Single fixed host instead of Leaflet's default {s} a/b/c
                    // sharding — under HTTP/2 that sharding just forces three
                    // separate handshakes instead of multiplexing tile requests
                    // over one already-preconnected connection.
                    url="https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />
                {filteredMarkers.map((marker) => (
                    <Marker
                        key={markerId(marker)}
                        position={[marker.lat, marker.lng]}
                        icon={createMarkerIcon(marker.game)}
                        ref={(el) => {
                            if (el) markerRefs.current.set(markerId(marker), el);
                            else markerRefs.current.delete(markerId(marker));
                        }}
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
