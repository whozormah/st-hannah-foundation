import Link from "next/link";

/* The website's 404, rendered inside the site's own layout so a mistyped
   address still shows the navigation and footer. The admin has its own
   layout and its own not-found handling. */
export default function NotFound() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="container-custom max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[4px] text-brand">
          404
        </p>

        <h1 className="mt-4 text-3xl font-bold text-ink md:text-5xl">
          This page could not be found
        </h1>

        <p className="mt-5 text-lg leading-9 text-gray-700">
          The address may be mistyped, or the page may have moved.
        </p>

        <Link
          href="/"
          className="mt-9 inline-flex rounded-full bg-brand px-8 py-4 font-semibold text-white transition hover:bg-brand-dark"
        >
          Back to the homepage
        </Link>
      </div>
    </section>
  );
}
