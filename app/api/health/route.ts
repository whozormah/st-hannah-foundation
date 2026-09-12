import { getPayload } from "payload";
import config from "@payload-config";

/* OBS-01: process and database liveness for uptime monitoring and for the
   deploy's rollback check, exposing no internal detail. */
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const payload = await getPayload({ config });

    await payload.count({
      collection: "admin-users",
      overrideAccess: true,
    });

    return Response.json({ status: "ok" });
  } catch {
    return Response.json({ status: "unavailable" }, { status: 503 });
  }
}
