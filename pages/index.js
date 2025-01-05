import { supabase } from "@/lib/suapbaseClient";
import { useUser } from "@/lib/useUser";
import { Auth } from "@supabase/auth-ui-react";
import useSWR from "swr";

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
            {user?.id && <LoggedIn />}
        </div>
    );
}

const Login = () => (
    <div className="m-10 border border-gray-300 rounded-md p-6 shadow-md">
        <Auth supabaseClient={supabase} magicLink />
    </div>
);

const LoggedIn = () => {
    return (
        <>
            <SetNameOfStoreForm />
        </>
    );
};

const SetNameOfStoreForm = () => {
    // This is a form that displays the current name of the store,
    // and also allows it to be edited. We'll fetch from supabase and update
    // there as well. store_settings.store_name is the name of the store.
    const { data, error, isLoading, mutate } = useSWR(
        "store_settings",
        async () => {
            const { data } = await supabase
                .from("store_settings")
                .select("store_name")
                .single();
            return data;
        }
    );
    console.log({ data });
    if (isLoading) return;
    if (error) return error.message;

    const storeName = data?.store_name;
    const updateStoreName = async (e) => {
        e.preventDefault();
        const { storeName } = e.target.elements;
        await supabase.from("store_settings").upsert({
            store_name: storeName.value,
        });
        mutate();
    };

    return (
        <form onSubmit={updateStoreName}>
            <label htmlFor="storeName">Store Name</label>
            <input
                type="text"
                id="storeName"
                name="storeName"
                defaultValue={storeName}
            />
            <button type="submit">Update</button>
        </form>
    );
};
