import type { Video } from "./types";

/**
 * YouTube videos per step.
 *
 * Only add a video after checking it:
 *  1. the channel is official or a recognised institution;
 *  2. the ID resolves (`pnpm validate:videos` calls YouTube's oEmbed endpoint);
 *  3. the content matches the step and the sources used in this app.
 * Never guess or fabricate an ID. Steps without a verified video show an explicit notice.
 */
export const videos: Video[] = [];

export const videosById: ReadonlyMap<string, Video> = new Map(videos.map((v) => [v.id, v]));
