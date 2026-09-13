import Image from "next/image";

/* The Foundation's mark on the admin login screen. The section 9 login
   screen specifies "Logo, 'Foundation Admin'". The name is set as real
   text: the lettering round the logo is too pale to read on a light
   background. */
export function Logo() {
  return (
    <div className="shf-logo">
      <Image
        className="shf-logo__mark"
        src="/logo.png"
        alt=""
        width={521}
        height={570}
        priority
      />
      <div>
        <p className="shf-logo__name">St. Hannah Foundation</p>
        <p className="shf-logo__role">Foundation Admin</p>
      </div>
    </div>
  );
}

/* The mark in the admin's navigation. The portrait is too detailed to read at
   this size — it becomes a blur — so the nav carries a monogram instead, in
   the brand colours. The portrait stays on the login screen, where it has
   room. */
export function Icon() {
  return (
    <span className="shf-icon" role="img" aria-label="St. Hannah Foundation">
      SH
    </span>
  );
}
