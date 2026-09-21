import { CatalogIndex, SeoData } from "components";
import { tournamentsCatalog } from "catalog/tournaments.catalog";

export const Tournaments = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Tournaments"}
                description="The one-stop shop for every single tournament ongoing for your esports game. Save time searching spend time playing."
                canonicalPath={"/tournaments"}
            />

            <CatalogIndex catalog={tournamentsCatalog} />
        </div>
    );
}
