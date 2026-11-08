import { useMatchChat } from "services/matchChat";
import { MatchChat } from "./MatchChat";

// The chat on the match page: the real thing, loaded from the API. Renders nothing for anyone
// who isn't a player in the match or an admin of the event.
export const MatchChatPanel = ({ eventId, matchId }) => {
    const chat = useMatchChat(eventId, matchId);

    const hide = (message) => {
        if (window.confirm(`Hide ${message.sender?.name}'s message from the players? It is also reported to uSync staff, who review it. You can't undo this yourself.`)) {
            chat.hide(message.id);
        }
    };

    return (
        <MatchChat
            chat={chat.chat}
            messages={chat.messages}
            error={chat.error}
            sendError={chat.sendError}
            busy={chat.busy}
            onSend={chat.send}
            onRequestAdmin={chat.requestAdmin}
            onJoin={chat.join}
            onLeave={chat.leave}
            onHide={hide}
            onReport={chat.report}
            onClearError={chat.clearSendError}
        />
    );
};
