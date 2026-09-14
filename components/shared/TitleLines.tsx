import { Fragment } from "react";

/* A title an editor wrote with line breaks, rendered as the site always
   has: each break as a <br />. */
export default function TitleLines({ text }: { text: string }) {
  const lines = text.split("\n");

  return lines.map((line, index) => (
    <Fragment key={index}>
      {line}
      {index < lines.length - 1 && (
        <>
          {" "}
          <br />
        </>
      )}
    </Fragment>
  ));
}
