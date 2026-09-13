import type { CollectionConfig } from "payload";

import { allow, allowField, canUseAdminPanel, ROLE_OPTIONS } from "../access";
import {
  RESET_LINK_LIFETIME_MS,
  resetEmailHTML,
  resetEmailSubject,
} from "../email/resetPassword";

/* Staff accounts. Owner-only management (section 8.2).

   One deliberate addition to the matrix: a signed-in member of staff can read
   their own record. The admin panel cannot render a session without it. They
   still cannot read anyone else's, and cannot change their own role. */
export const AdminUsers: CollectionConfig = {
  slug: "admin-users",
  labels: { singular: "Administrator", plural: "Administrators" },
  auth: {
    forgotPassword: {
      expiration: RESET_LINK_LIFETIME_MS,
      generateEmailSubject: resetEmailSubject,
      generateEmailHTML: resetEmailHTML,
    },
  },
  admin: {
    useAsTitle: "name",
    group: "Administration",
    defaultColumns: ["name", "email", "role", "status"],
  },
  access: {
    admin: canUseAdminPanel,
    create: allow("owner"),
    read: ({ req }) => {
      const user = req.user as { id?: string | number; role?: string } | null;

      if (!user) return false;
      if (user.role === "owner") return true;

      return { id: { equals: user.id } };
    },
    update: allow("owner"),
    delete: allow("owner"),
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "role",
      type: "select",
      required: true,
      options: ROLE_OPTIONS,
      // ACL-08: a role is assigned by the Owner and never self-assigned.
      access: {
        create: allowField("owner"),
        update: allowField("owner"),
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "active",
      options: [
        { label: "Active", value: "active" },
        { label: "Suspended", value: "suspended" },
      ],
      access: {
        create: allowField("owner"),
        update: allowField("owner"),
      },
    },
  ],
};
