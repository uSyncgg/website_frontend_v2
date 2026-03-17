import { useEffect } from "react";

export const TwitterEmbed = () => {
    useEffect(() => {
      // Check if script is already added
      if (!window.twttr) {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        document.body.appendChild(script);
      } else {
        // If script already loaded, manually re-render embeds
        window.twttr.widgets.load();
      }
    }, []);
  
    return (
      <blockquote className="twitter-tweet">
        <p lang="en" dir="ltr">
          Why YOU should use OUR SITE.
          <br />
          A thread of what uSync does and how it can help you compete or host competitions in Esports. 🧵
          <a href="https://t.co/LiXoUeutrs">pic.twitter.com/LiXoUeutrs</a>
        </p>
        &mdash; uSync (@uSyncGG)
        <a href="https://twitter.com/uSyncGG/status/1812969871845827047">July 15, 2024</a>
      </blockquote>
    );
  }; 
