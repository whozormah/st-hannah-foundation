/* The same access rules apply here as to REST and the local API (ACL-02).
   Acceptance test A5 queries this route as well as REST. */
import config from "@payload-config";
import { GRAPHQL_POST, REST_OPTIONS } from "@payloadcms/next/routes";

export const POST = GRAPHQL_POST(config);
export const OPTIONS = REST_OPTIONS(config);
