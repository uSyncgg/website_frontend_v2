import { GameImage, HeaderImage } from "components";

export const Tournaments = () => {
    return (
        <div className="standardContainer">
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