// One codebase, several branded binaries. The entry file (src/bin/<brand>.ts) picks the brand before
// anything else is imported; every user-facing name, host and storage location comes from here.

export type BrandId = "nextx" | "gymmaster"
  ;
/** Which backend contract the brand talks to. A platform may have its own assistant and proposal APIs; most brands share the default one. */
export type PlatformId = "nextx"
  ;
export type EnvName = "prod" | "sandbox";

export interface Endpoints {
  /** Public API gateway, without trailing slash. */
  api: string;
  /** OAuth authorization server (browser login). */
  auth: string;
  /** Hosted MCP server URL. */
  mcp: string;
  /** Web app, used for confirmation links. */
  app: string;
  /** Developer portal. */
  docs: string;
  /** Account portal (sessions, devices). */
  id: string;
}

export interface Brand {
  id: BrandId;
  platform: PlatformId;
  /** Command users type. */
  bin: string;
  /** Product name shown in the terminal. */
  name: string;
  /** Name of the AI assistant. */
  aiName: string;
  /** npm package name. */
  pkg: string;
  /** OAuth client id of the CLI (public client, PKCE, loopback redirect). */
  clientId: string;
  /** Prefix of environment variables (NEXTX_API_KEY, …). */
  envPrefix: string;
  /** Mobile app name for QR login. */
  mobileApp: string;
  /** Examples shown in help: permission codes for `keys create --scopes`, and what a CI write policy covers. */
  examples: { scopes: string; ciKinds: string };
  /** A typical first question, shown in hints. */
  example: { vi: string; en: string };
  /** A real request for `api --help`, valid on this brand's gateway. */
  apiExample: string;
  /** Sign-in methods the brand's server does not offer yet; the CLI says so instead of failing mid-flow. */
  notYet?: ("device" | "ci")[];
  /** Where an admin allows a CI repository, after the web app address. */
  ciSettings: { vi: string; en: string };
  /** Modules this brand exposes. null = all. */
  modules: string[] | null;
  env: Record<EnvName, Endpoints>;
}


const GYMMASTER: Brand = {
  id: "gymmaster",
  platform: "nextx",
  bin: "gymmaster",
  name: "Gym Master",
  aiName: "Gym Master AI",
  pkg: "@gymmasterai/cli",
  clientId: "gymmaster-cli",
  envPrefix: "GYMMASTER",
  mobileApp: "Gym Master",
  examples: { scopes: "gym.members.view,gym.contracts.view", ciKinds: "gym.members.create" },
  example: { vi: "hội viên sắp hết hạn tuần này", en: "members expiring this week" },
  apiExample: "GET /iam/auth/me",
  ciSettings: { vi: "Thiết lập › Ứng dụng & API › CI", en: "Settings › Apps & API › CI" },
  modules: ["gym", "payment", "einvoice", "comm", "marketing"],
  env: {
    prod: {
      api: "https://api.nextx.vn",
      auth: "https://auth.nextx.vn",
      mcp: "https://mcp.gymmaster.vn/mcp",
      app: "https://app.nextx.vn",
      docs: "https://developers.gymmaster.vn",
      id: "https://id.nextx.vn",
    },
    sandbox: {
      api: "https://api-dev.nextx.vn",
      auth: "https://auth-dev.nextx.vn",
      mcp: "https://mcp-dev.gymmaster.vn/mcp",
      app: "https://app-dev.nextx.vn",
      docs: "https://developers-dev.gymmaster.vn",
      id: "https://id-dev.nextx.vn",
    },
  },
};


// Exported trees keep only their own brand (scripts/export.sh strips the other block and its line here).
const BRANDS: Partial<Record<BrandId, Brand>> = {
  gymmaster: GYMMASTER,
};

let current: Brand = Object.values(BRANDS)[0]!;

export function setBrand(id: BrandId): void {
  const b = BRANDS[id];
  if (b) current = b;
}

export function brand(): Brand {
  return current;
}

/** Reads `<PREFIX>_<name>` from the environment, e.g. envVar("API_KEY") → NEXTX_API_KEY. */
export function envVar(name: string): string | undefined {
  const v = process.env[`${current.envPrefix}_${name}`];
  return v === undefined || v === "" ? undefined : v;
}
