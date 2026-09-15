/* The website's data cache, kept in memory only.

   Why not Next.js's default, which also writes to disk: when content is
   published, the default only marks the cached copy as stale, and that mark
   lives in memory. Restarting the server forgets it, and the old copy still
   on disk is served again as current. Found on 15 September 2026, when a
   restart brought back a homepage without a section that had been published
   since — on the live site, any restart or redeploy could have done the same
   with up to an hour of changes (PUB-04).

   Here, publishing deletes the cached copies (revalidateTag), and nothing
   outlives the process: after a restart the cache is empty and every page is
   read fresh from the database. The site's content is small, and there is one
   server, so memory is the right place (section 3).

   The shape follows the handler in the Next.js self-hosting guide. */

const cache = new Map();

module.exports = class CacheHandler {
  constructor(options) {
    this.options = options;
  }

  async get(key) {
    return cache.get(key) ?? null;
  }

  async set(key, data, ctx) {
    cache.set(key, {
      value: data,
      lastModified: Date.now(),
      tags: ctx?.tags ?? [],
    });
  }

  async revalidateTag(tags) {
    const expired = [tags].flat();

    for (const [key, entry] of cache) {
      if (entry.tags.some((tag) => expired.includes(tag))) cache.delete(key);
    }
  }

  resetRequestCache() {}
};
