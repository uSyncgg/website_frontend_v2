import { applyHidden, chatErrorMessage, mergeMessages } from './matchChat';

const m = (id, extra = {}) => ({ id, kind: 'user', sender: { name: 'cat', role: 'player' }, body: `msg ${id}`, hidden: false, canReport: true, canHide: false, ...extra });

describe('mergeMessages', () => {
    it('adds new messages in order without duplicating', () => {
        expect(mergeMessages([m(1), m(3)], [m(2), m(3)]).map(x => x.id)).toEqual([1, 2, 3]);
    });
});

describe('applyHidden', () => {
    it('blanks a message for players once an admin hides it, and stops them reporting it', () => {
        const [a, b] = applyHidden([m(1), m(2)], [2], false);
        expect(a.body).toBe('msg 1');
        expect(b).toMatchObject({ hidden: true, body: '', canReport: false });
    });

    it('keeps the text for an admin, marked hidden, and puts it back when staff restore it', () => {
        const hidden = applyHidden([m(2, { canHide: true })], [2], true)[0];
        expect(hidden).toMatchObject({ hidden: true, body: 'msg 2', canHide: false });
        expect(applyHidden([hidden], [], true)[0]).toMatchObject({ hidden: false, canHide: true });
    });
});

describe('chatErrorMessage', () => {
    it("shows the chat's own 429 wording instead of the generic rate-limit text", () => {
        const err = { response: { status: 429, data: { detail: "You're sending messages too fast. Wait a few seconds." } } };
        expect(chatErrorMessage(err)).toBe("You're sending messages too fast. Wait a few seconds.");
    });

    it('uses the server detail for other statuses', () => {
        const err = { response: { status: 422, data: { detail: "Links to adult sites aren't allowed." } } };
        expect(chatErrorMessage(err)).toBe("Links to adult sites aren't allowed.");
    });
});
