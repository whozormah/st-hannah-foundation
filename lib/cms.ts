import { unstable_cache } from "next/cache";
import { getPayload } from "payload";

import config from "@payload-config";

import { CMS_TAGS } from "./cms-tags";

/* Reading website content from the CMS.

   Each read is cached and tagged. When an editor publishes, a hook
   (payload/revalidate.ts) invalidates the tag, and the next visitor gets the
   new content — PUB-04, within 60 seconds and without a deployment.

   `unstable_cache` rather than the newer `'use cache'`: in Next 16 the newer
   API requires switching the whole app to Cache Components, which changes how
   every existing page renders. This works today with nothing else changed;
   moving to `'use cache'` later is a contained change inside this file.

   Only published content is ever read here (CNT-05): drafts stay in the
   admin until someone publishes them. */

export { CMS_TAGS };

async function payloadClient() {
  return getPayload({ config });
}

export type Testimonial = { name: string; role: string; text: string };

export const getTestimonials = unstable_cache(
  async (): Promise<Testimonial[]> => {
    const payload = await payloadClient();

    const { docs } = await payload.find({
      collection: "testimonials",
      where: { _status: { equals: "published" } },
      sort: "order",
      limit: 100,
      depth: 0,
    });

    return docs.map((doc) => ({
      name: doc.name,
      role: doc.role ?? "",
      text: doc.quote,
    }));
  },
  [CMS_TAGS.testimonials],
  { tags: [CMS_TAGS.testimonials] },
);
