import { CatalogIndex, SeoData } from "components";
import { lansCatalog } from "catalog/lans.catalog";

export const Lans = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"LANs"}
                description="Find esports LAN events for your favorite game titles near you. From Call of Duty to League of Legends we have every LAN going on."
                canonicalPath={"/lans"}
            />

            <CatalogIndex catalog={lansCatalog} />
        </div>
    );
}
