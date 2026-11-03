import { CatalogIndex, SeoData, AddYourEventButton } from "components";
import { leaguesCatalog } from "catalog/leagues.catalog";

export const Leagues = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Leagues"}
                description="Find a league to join for competitive esports. With over 200+ leagues we have what you are looking for."
                canonicalPath={"/leagues"}
            />

            <AddYourEventButton type="league" />
            <CatalogIndex catalog={leaguesCatalog} />
        </div>
    );
}
