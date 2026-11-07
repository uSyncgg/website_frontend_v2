import { resolveViews } from "./profileViews";

const host = { type: "host", public_id: "h1", username: "MattHosts" };
const player = { type: "player", public_id: "p1", username: "Matt" };
const venue = { type: "venue", public_id: "v1", username: "Arena" };

test("the shown profile and its others make up the views, in toggle order", () => {
    const { views, active } = resolveViews({ ...venue, others: [host, player] });
    expect(views.map(view => view.key)).toEqual(["player", "host", "venue"]);
    expect(active).toBe("venue");
});

test("each view links to that profile's own page", () => {
    const { views } = resolveViews({ ...player, others: [host] });
    expect(views.map(view => view.path)).toEqual(["/profile/p1/Matt", "/profile/h1/MattHosts"]);
});

test("a profile with no others has a single view", () => {
    expect(resolveViews({ ...host, others: [] }).views).toHaveLength(1);
});
