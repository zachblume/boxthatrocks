import { supabase } from "@/lib/suapbaseClient";
import { Auth } from "@supabase/auth-ui-react";

export default function Home() {
    const isLoggedIn = supabase.auth.getUser();
    return (
        <div className="text-center my-6">
            <h1 className="text-3xl font-extrabold">Box that rocks</h1>
            <p>
                The best platform to run your monthly subscription box
                e-commerce store
            </p>
            {JSON.stringify(isLoggedIn)}
            <div className="m-10 border border-gray-300 rounded-md p-6 shadow-md">
                <Auth supabaseClient={supabase} magicLink />
            </div>
        </div>
    );
}
