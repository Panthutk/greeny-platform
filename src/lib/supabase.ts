import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const isSupabaseConfigured = () => {
  return (
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("placeholder") &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) &&
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.includes("placeholder")
  );
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export const STORAGE_BUCKETS = {
  PRODUCT_MEDIA: "product-media",
  CERTIFICATION_DOCS: "certification-docs",
  SOCIAL_POSTS: "social-posts",
  PAYMENT_SLIPS: "payment-slips",
} as const;

// Auth helper functions
export async function signInWithProvider(
  provider: "google" | "facebook" | "line"
): Promise<{ data: any; error: any; simulated?: boolean }> {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase credentials not configured in .env, simulating redirect to /me");
    return { data: null, error: null, simulated: true };
  }
  const redirectTo = `${window.location.origin}/me`;
  return await supabase.auth.signInWithOAuth({
    provider: provider as any,
    options: {
      redirectTo,
    },
  });
}

export async function signInWithEmailPassword(
  email: string,
  password: string
): Promise<{ data: any; error: any; simulated?: boolean }> {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase not configured, mock sign in");
    return { data: { user: { email, id: "mock-user-id" } }, error: null, simulated: true };
  }
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function signUpWithEmailPassword(
  email: string,
  password: string,
  name?: string
): Promise<{ data: any; error: any; simulated?: boolean }> {
  if (!isSupabaseConfigured()) {
    return { data: { user: { email, id: "mock-user-id" } }, error: null, simulated: true };
  }
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: name || email.split("@")[0],
      },
    },
  });
}

export async function signOutUser() {
  if (!isSupabaseConfigured()) {
    return { error: null };
  }
  return await supabase.auth.signOut();
}

export async function getClientSession() {
  if (!isSupabaseConfigured()) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
}
