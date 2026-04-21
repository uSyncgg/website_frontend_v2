import { SeoData, GameImage, HeaderImage, EventTypeImages, TwitterEmbed } from "components"
import './More.css';

export const ComingSoon = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Find out what game titles are coming soon to uSync. Request a game of your choice to be published on www.usync.gg"
                canonicalPath={"Comingsoon"}
            />
            <HeaderImage title={"Coming Soon"} imageClass={"comingSoonPage"} />

            <GameImage
                games={
                    {
                        "Fortnite": "#",
                        "Apex Legends": "#",
                        "Super Smash Bros": "#",
                        "Overwatch 2": "#"
                    }
                }

                title={"Game Titles"}
            />

            <div className="comingSoonContainer minorBottomSpace">
                <h2 className="white comingSoonDesc">
                    We are actively working on different titles in order to bring the best competition to you. These take time due to the competitive scenes varying from title to title. Your continued use of our services allow for us to keep working on new titles for the future. Thank you!
                </h2>
            </div>
            
            <div>
                <h2 className="white comingSoonTitle">Event Types</h2>
                <img className={"underlineImg"} src="https://i.imgur.com/eNhKhTI.png" alt="underline" />

                <EventTypeImages page={"Coming Soon"} />
            </div>

            <div className="comingSoonContainer">
                <h2 className="white comingSoonDesc">
                    We are looking to provide a list of daily tournaments from all of the varying sites so that players don't have to move from site to site to find what they are looking for!
                </h2>
            </div>

            <div className="comingSoonContainer minorBottomSpace">
                <h2 className="white comingSoonDesc">
                    Unfortunately, implementing this feature is costly and our services are free which places a heavy burden on us. However, in the meantime keep up to date with what we are working on with our Twitter!
                </h2>
                
            </div>
            
            <div className="comingSoonContainer minorBottomSpace">
                <TwitterEmbed />
            </div>
            
        </div>
    )
}
