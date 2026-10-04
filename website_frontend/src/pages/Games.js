import { CatalogIndex, SeoData } from "components";
import { gamesCatalog } from "catalog/games.catalog";

export const Games = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Games"}
                description="Find your next competition in one of our 7 different supported titles!"
                canonicalPath={"/games"}
            />

            <CatalogIndex catalog={gamesCatalog} />
        </div>
    );
}
