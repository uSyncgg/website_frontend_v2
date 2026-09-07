import { useMemo } from "react";
import { SeoData, HostBanner, NoEvents, LanMap } from "components";
import { useLanEvents } from "hooks";
import { toLanMarkers } from 'data/lanMarkers';
import { buildEventPath } from 'utils/eventPaths';
import '../EventBanners.css';

const GAME = "Conventions";

const normalizeLan = (event) => ({
    name: event.name,
    path: buildEventPath('/lans', event.path),
    imgUrl: event.banner_img,
    alt: event.name,
    verified: !!event.verified,
    region: event.location,
});

const LanBanner = ({ lan }) => (
    <HostBanner path={lan.path}>
        <HostBanner.Title path={lan.path} verified={lan.verified}>{lan.name}</HostBanner.Title>
        <HostBanner.Image
            path={lan.path}
            imgUrl={lan.imgUrl}
            alt={lan.alt}
        />
        <HostBanner.Region>{lan.region}</HostBanner.Region>
        <HostBanner.Button title={"More Info"} path={lan.path} />
    </HostBanner>
);

export const Conventions = () => {
    const { data, loading, error } = useLanEvents(GAME);

    const lans = useMemo(() => (data || []).map(normalizeLan), [data]);
    const markers = useMemo(() => toLanMarkers(data, GAME), [data]);

    return (
        <div className="standardContainer">
            <SeoData
                title={"Conventions"}
                description="Find esports LAN conventions and in-person gaming events. Browse gaming conventions and multi-game LAN events happening across the country."
                canonicalPath={"/other-lans"}
            />

            <div className="lanMapContainer">
                <LanMap markers={markers} game="Conventions" />
            </div>

            {loading ? (
                <h2 className="eventSeparationTitle" style={{ fontSize: "2rem" }}>Loading conventions...</h2>
            ) : error ? (
                <h2 className="eventSeparationTitle" style={{ fontSize: "2rem" }}>Unable to load conventions right now.</h2>
            ) : lans.length === 0 ? (
                <div className="eventBannerContainer">
                    <NoEvents pageType={"LANs"} />
                </div>
            ) : (
                <div className="eventBannerContainer">
                    {lans.map(lan => (
                        <LanBanner key={lan.path} lan={lan} />
                    ))}
                </div>
            )}
        </div>
    );
}
