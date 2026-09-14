/* A quotation, styled as the impact stories show theirs. */
export default function QuoteBlock({ text, author }: { text: string; author: string }) {
  if (!text) return null;

  return (
    <section className="bg-white py-14 md:py-24">
      <div className="container-custom">
        <figure className="mx-auto max-w-4xl rounded-[32px] border-l-4 border-brand bg-cream p-6 sm:p-10 md:p-14">
          <blockquote className="text-2xl italic leading-10 text-gray-700">
            &quot;{text}&quot;
          </blockquote>

          {author && (
            <figcaption className="mt-8 text-lg font-bold text-brand">{author}</figcaption>
          )}
        </figure>
      </div>
    </section>
  );
}
