import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useCurrentUser } from "hooks";
import { usePostYourEvent } from "hooks/usePostYourEvent";

// /more/eventhost, where the old "Post Your Event" form was (archived in More/Archive). Links
// across the site still point here: hosts go straight to the event form, and anyone else lands
// on the home page with the popup saying they need a host profile.
export const PostYourEventEntry = () => {
    const { status } = useCurrentUser();
    const postEvent = usePostYourEvent();
    const navigate = useNavigate();
    const started = useRef(false);

    useEffect(() => {
        if (status === 'loading' || started.current) return;
        started.current = true;
        postEvent({ replace: true }).then(posted => {
            if (!posted) navigate('/', { replace: true });
        });
    }, [status, postEvent, navigate]);

    return null;
};
