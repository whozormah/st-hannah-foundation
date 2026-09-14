import type { SerializedAutoLinkNode, SerializedLinkNode } from "@payloadcms/richtext-lexical";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import {
  RichText,
  type JSXConverter,
  type JSXConvertersFunction,
} from "@payloadcms/richtext-lexical/react";

import { isSafeLink } from "@/lib/links";

/* Links are checked when the block is published; this checks again on the
   way out, so an unsafe address never reaches a visitor as a link (CNT-04).
   One that fails shows as plain text. */
const link: JSXConverter<SerializedAutoLinkNode | SerializedLinkNode> = ({ node, nodesToJSX }) => {
  const children = nodesToJSX({ nodes: node.children });
  const url = node.fields.url ?? "";

  if (!isSafeLink(url)) return <>{children}</>;

  return (
    <a href={url} {...(node.fields.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
    </a>
  );
};

const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  link,
  autolink: link,
});

export default function RichTextBlock({ content }: { content: SerializedEditorState | null }) {
  if (!content?.root?.children?.length) return null;

  return (
    <section className="bg-white py-14 md:py-24">
      <div className="container-custom">
        <RichText
          data={content}
          converters={converters}
          // Never inline styles, even from content saved some other way (CNT-04).
          disableIndent
          disableTextAlign
          className={[
            "mx-auto max-w-3xl text-lg leading-9 text-gray-700",
            "[&_p]:mt-6 [&_p:first-child]:mt-0",
            "[&_h2]:mt-12 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:text-ink md:[&_h2]:text-4xl",
            "[&_h3]:mt-10 [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-ink",
            "[&_:is(h2,h3):first-child]:mt-0",
            "[&_ul]:mt-6 [&_ul]:list-disc [&_ul]:space-y-3 [&_ul]:pl-6 [&_ul]:marker:text-brand",
            "[&_ol]:mt-6 [&_ol]:list-decimal [&_ol]:space-y-3 [&_ol]:pl-6 [&_ol]:marker:text-brand",
            "[&_blockquote]:mt-8 [&_blockquote]:border-l-4 [&_blockquote]:border-brand [&_blockquote]:pl-6 [&_blockquote]:italic",
            "[&_a]:font-semibold [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-4",
          ].join(" ")}
        />
      </div>
    </section>
  );
}
