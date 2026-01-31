import { supabase } from "@/lib/supabase";
import { AuthError, Session, User } from "@supabase/supabase-js";

export const AuthService = {
    /**
     * Login with email and password
     */
    login: async (email: string, password: string): Promise<{ data: { user: User | null; session: Session | null }; error: AuthError | null }> => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        return { data, error };
    },

    /**
     * Logout current user
     */
    logout: async (): Promise<{ error: AuthError | null }> => {
        const { error } = await supabase.auth.signOut();
        return { error };
    },

    /**
     * Get current session
     */
    getSession: async (): Promise<{ data: { session: Session | null }; error: AuthError | null }> => {
        const { data, error } = await supabase.auth.getSession();
        return { data, error };
    },

    /**
     * Get current user
     */
    getUser: async (): Promise<{ data: { user: User | null }; error: AuthError | null }> => {
        const { data, error } = await supabase.auth.getUser();
        return { data, error };
    },

    /**
     * Subscribe to auth state changes
     */
    onAuthStateChange: (callback: (event: string, session: Session | null) => void) => {
        const { data } = supabase.auth.onAuthStateChange((event, session) => {
            callback(event, session);
        });
        return data.subscription;
    }
};
