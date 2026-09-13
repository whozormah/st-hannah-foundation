import Image from "next/image";

/* The brand panel on every sign-in screen (login, forgot password, reset).

   Built from the brand itself rather than a photograph: this is a staff tool
   for sensitive beneficiary records, and people's photographs belong on the
   public site, where their use was agreed.

   On desktop it fills the left of the screen; on phones and tablets it is a
   card above the form (app/(payload)/custom.css). */
export function Logo() {
  return (
    <aside className="shf-panel" aria-label="St. Hannah Foundation">
      <div className="shf-panel__inner">
        <div className="shf-panel__mark">
          <Image src="/logo.png" alt="" width={521} height={570} priority />
        </div>

        <p className="shf-panel__name">St. Hannah Foundation</p>
        <span className="shf-panel__rule" aria-hidden />
        <p className="shf-panel__tagline">
          Igniting Hope, Lighting Up The Future
        </p>
      </div>

      <p className="shf-panel__foot">Foundation Admin · Staff access only</p>
    </aside>
  );
}

/* The welcome above the sign-in form — login screen only. */
export function SignInHeading() {
  return (
    <header className="shf-signin">
      <p className="shf-signin__eyebrow">Foundation Admin</p>
      <h1 className="shf-signin__title">Welcome back</h1>
      <p className="shf-signin__lede">
        Sign in to manage the Foundation&apos;s work.
      </p>
    </header>
  );
}

/* The mark in the admin's navigation. The portrait is too detailed to read at
   this size — it becomes a blur — so the nav carries a monogram instead, in
   the brand colours. */
export function Icon() {
  return (
    <span className="shf-icon" role="img" aria-label="St. Hannah Foundation">
      SH
    </span>
  );
}
