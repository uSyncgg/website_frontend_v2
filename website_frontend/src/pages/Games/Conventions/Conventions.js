import { SeoData, HostBanner, LanMap } from "components";
import { CONVENTION_MARKERS } from 'data/lanMarkers';
import '../EventBanners.css';

export const Conventions = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Conventions"}
                description="Find esports LAN conventions and in-person gaming events. Browse gaming conventions and multi-game LAN events happening across the country."
                canonicalPath={"/other-lans"}
            />

            <div className="lanMapContainer">
                <LanMap markers={CONVENTION_MARKERS} game="Conventions" />
            </div>

            <div className="eventBannerContainer">
                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/lans/hellcase-cs2-2026"}>Hellcase CS2 LAN 2026</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/lans/hellcase-cs2-2026"} 
                        imgUrl={"https://i.imgur.com/3vI1PAe.png"} 
                        alt={"Hellcase CS2 LAN 2026"}
                        verified={false}
                    />
                    <HostBanner.Region>Lakewood, CO</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/lans/hellcase-cs2-2026"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/lans/lan-a-thon-under-the-sun-2026"}>LAN-A-THON Under The Sun 2026</HostBanner.Title>
                    <HostBanner.Image
                        path={"/lans/lan-a-thon-under-the-sun-2026"}
                        imgUrl={"https://i.imgur.com/WJxYRyN.png"}
                        alt={"LAN-A-THON Under The Sun 2026"}
                        verified={false}
                    />
                    <HostBanner.Region>Bonita, CA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/lans/lan-a-thon-under-the-sun-2026"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/lans/fortlan-2026"}>FortLAN 2026</HostBanner.Title>
                    <HostBanner.Image
                        path={"/lans/fortlan-2026"}
                        imgUrl={"https://i.imgur.com/W1iIUMc.png"}
                        alt={"FortLAN 2026"}
                        verified={false}
                    />
                    <HostBanner.Region>Fort Wayne, IN</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/lans/fortlan-2026"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/lans/lan-all-night-2026"}>LAN All Night 2026</HostBanner.Title>
                    <HostBanner.Image
                        path={"/lans/lan-all-night-2026"}
                        imgUrl={"https://i.imgur.com/lKQp2gM.png"}
                        alt={"LAN All Night 2026"}
                        verified={false}
                    />
                    <HostBanner.Region>Grapevine, TX</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/lans/lan-all-night-2026"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/lans/gears-of-war-e-day-launch-tournament"}>Gears of War E-Day Launch Tournament</HostBanner.Title>
                    <HostBanner.Image
                        path={"/lans/gears-of-war-e-day-launch-tournament"}
                        imgUrl={"https://i.imgur.com/UzG9CI7.png"}
                        alt={"Gears of War E-Day Launch Tournament"}
                        verified={false}
                    />
                    <HostBanner.Region>Columbus, OH</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/lans/gears-of-war-e-day-launch-tournament"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
