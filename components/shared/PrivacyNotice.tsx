import type { ReactNode } from "react";
import Link from "next/link";

// One line beside every form that collects personal information, saying what
// the details are for and linking to the policy. The policy opens in a new tab
// so nobody loses a half-completed form by following the link.
export default function PrivacyNotice({
  children,
  dark = false,
  className = "",
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <p
      className={`text-sm leading-7 ${
        dark ? "text-gray-400" : "text-gray-600"
      } ${className}`}
    >
      {children} See our{" "}
      <Link
        href="/privacy"
        target="_blank"
        rel="noopener noreferrer"
        className={`font-semibold underline underline-offset-4 ${
          dark
            ? "text-accent-soft hover:text-white"
            : "text-brand hover:text-brand-dark"
        }`}
      >
        Privacy Policy
        <span className="sr-only"> (opens in a new tab)</span>
      </Link>
      .
    </p>
  );
}
