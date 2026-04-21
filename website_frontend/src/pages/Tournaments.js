import { SeoData, GameImage, HeaderImage } from "components";

export const Tournaments = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="The one-stop shop for every single tournament ongoing for your esports game. Save time searching spend time playing."
                canonicalPath={"/tournaments"}
            />
            <HeaderImage title={"Tournament Titles"} imageClass={"tournamentsPage"} />

            <GameImage 
                games={
                    {
                        "Call of Duty": "/tournaments/call-of-duty-tournaments"
                    }
                }
            />
        </div>
    );
}