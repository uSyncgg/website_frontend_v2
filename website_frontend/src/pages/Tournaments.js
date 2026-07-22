import { SeoData, GameImage, HeaderImage } from "components";

export const Tournaments = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Tournaments"}
                description="The one-stop shop for every single tournament ongoing for your esports game. Save time searching spend time playing."
                canonicalPath={"/tournaments"}
            />
            <HeaderImage
                title={"Tournament Titles"}
                imageClass={"tournamentsPage"}
                eyebrow={"Live Every Day"}
                subtext={"Every ongoing tournament for your esports title, all in one place."}
            />

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