const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function ensureEnv() {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Supabase environment variables are missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (or SUPABASE_SERVICE_ROLE_KEY)."
    );
  }
}

export function supabaseHeaders(extra?: HeadersInit): HeadersInit {
  ensureEnv();

  return {
    apikey: supabaseKey as string,
    Authorization: `Bearer ${supabaseKey}`,
    "Content-Type": "application/json",
    ...extra
  };
}

export function supabaseRestUrl(path: string) {
  ensureEnv();
  return `${supabaseUrl}/rest/v1${path}`;
}
