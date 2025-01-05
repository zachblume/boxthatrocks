import { supabase } from "@/lib/suapbaseClient";
import { useEffect, useState } from "react";

export const useUser = () => {
    const [user, setUser] = useState();
    useEffect(() => {
        // Init
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                const currentUser = session?.user;
                setUser(currentUser ?? null);
            }
        );

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);
    return user;
};
