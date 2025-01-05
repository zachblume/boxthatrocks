import { supabase } from "@/lib/suapbaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { useEffect, useState } from "react";

const useUser = () => {
    const [user, setUser] = useState(supabase.auth.getUser());
    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                const currentUser = session?.user;
                setUser(currentUser ?? null);
            }
        );
        return () => {};
    });
    return user;
};

export default function Home() {
    const user = useUser();
    return (
        <div className="text-center my-6">
            <h1 className="text-3xl font-extrabold">Box that rocks</h1>
            <p>
                The best platform to run your monthly subscription box
                e-commerce store
            </p>
            {!user?.id && <Login />}
            {user?.id && "Logged in!"}
        </div>
    );
}

const Login = () => (
    <div className="m-10 border border-gray-300 rounded-md p-6 shadow-md">
        <Auth supabaseClient={supabase} magicLink />
    </div>
);
