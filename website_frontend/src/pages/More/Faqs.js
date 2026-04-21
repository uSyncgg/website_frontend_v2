import { SeoData } from "components";
import { Link } from "react-router";

export const Faqs = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Frequently asked questions about esports and how to begin. Find articles on the competitive esports landscape today."
                canonicalPath={"/more/FAQ"}
            />
            <div className="faqContainer">
                <div className="faqSectionOne">
                    <div>
                        <h1 className="white faqTitle">Featured Games</h1>
                        <div className="faqGameContainer">
                            <Link to={"/games/call-of-duty"}>
                                <img src="https://i.imgur.com/gNvoNEo.png" alt="Call of Duty" className="faqGameImage" />
                            </Link>
                             <Link to={"/games/warzone"}>
                                <img src="https://i.imgur.com/IBGIbY2.png" alt="Warzone" className="faqGameImage" />
                            </Link>
                             <Link to={"/games/halo"}>
                                <img src="https://i.imgur.com/wqKJfEu.png" alt="Halo" className="faqGameImage" /> 
                            </Link>
                            <Link to={"/games/LoL"}>
                                <img src="https://i.imgur.com/5riYNow.png" alt="League of Legends" className="faqGameImage" />
                            </Link>
                            <Link to={"/games/RocketLeague"}>
                                <img src="https://i.imgur.com/GJO8JIZ.png" alt="Rocket League" className="faqGameImage" />
                            </Link>
                            <Link to={"/games/Valorant"}>
                                <img src="https://i.imgur.com/Gsl3oIp.png" alt="Valorant" className="faqGameImage" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <div className="faqLinkTitle">
                        <Link to={"/more/articles"} className="faqLink">FAQ Articles</Link>
                        </div>
                        <div>
                            <Link to={"/more/FAQ/The-Problem-With-Esports"}>
                                <img src="https://i.imgur.com/NeuvzkG.png" alt="The Problem With Esports" className="faqArticleImage" />
                            </Link>
                            <Link to={"/more/FAQ/What-We-Provide"}>
                                <img src="https://i.imgur.com/ZX9jveL.png" alt="What We Provide" className="faqArticleImage" />
                            </Link>
                            <Link to={"/more/FAQ/How-We-Fix-It"}>
                                <img src="https://i.imgur.com/0KG2Yd4.png" alt="How We Fix It" className="faqArticleImage" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="faqSectionTwo">
                    <h1 className="white faqTitle">Frequently Asked Questions</h1>
                    <div className="faqTextContainer">
                        <p className="faqQuestion">
                            Q: How do I sign up for competitions?
                        </p>
                        <p className="faqAnswer">
                            A: You can sign up directly from the "Join Now" button on your desired event. From there, you will be redirected to that event's registeration page. If you have any trouble, feel free to {" "}
                            <Link to={"/more/contactus"} className="faqAnswerLink">Contact Us</Link>
                        </p>
                    </div>
                    <div className="faqTextContainer">
                        <p className="faqQuestion">
                            Q: What are the different types of competitions?
                        </p>
                        <p className="faqAnswer">
                            A: There are 5 types of competitions for each game: Tournaments, Wagers, LANs, Head-to-head, and Leagues. To learn more about each type, check out our video explaining them {" "}
                            <Link to={"https://www.youtube.com/watch?v=2EebBr4dd2c"} className="faqAnswerLink" target="_blank">Here</Link>
                        </p>
                    </div>
                    <div className="faqTextContainer">
                        <p className="faqQuestion">
                            Q: What's the easiest way to navigate the site?
                        </p>
                        <p className="faqAnswer">
                            A: The best way to navigate the site is either going page-to-page or watching this {" "}
                            <Link to={"https://www.youtube.com/watch?v=ojWSFWJX4b8"} className="faqAnswerLink" target="_blank">Short Video</Link>
                        </p>
                    </div>
                    <div className="faqTextContainer">
                        <p className="faqQuestion">
                            Q: What are the rules?
                        </p>
                        <p className="faqAnswer">
                            A: Each game title has a different ruleset based on the gamemode. The best way to find the rules is to check through the provider you are playing for as each has their own variation. Here is an {" "}
                            <Link to={"https://docs.google.com/document/d/1X0wywI5JhINTL4RqaUXS8fPj1TaVcsAHJjks9KfeEQU/edit"} className="faqAnswerLink" target="_blank">Example</Link>
                        </p>
                    </div>
                    <div className="faqTextContainer">
                        <p className="faqQuestion">
                            Q: How do I post my own event?
                        </p>
                        <p className="faqAnswer">
                            A: You can post your own event by submitting an {" "}
                            <Link to={"/more/eventhost"} className="faqAnswerLink">Event Host</Link>
                            {" "} form. Once submitted we will ensure the event is to the uSync standard, and post it within 2-3 business days.
                        </p>
                    </div>
                    <div className="faqTextContainer">
                        <p className="faqQuestion">
                            Q: What is uSync Verified?
                        </p>
                        <p className="faqAnswer">
                            A: uSync verified is our way of ensuring the legitimacy of our event hosts. All events with the uSync Verified checkmark have been independently verified by our team to be a safe, and quality competition for all entrants. {" "}
                            <Link to={"/more/verification"} className="faqAnswerLink">Contact Us</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    ); 
} 
