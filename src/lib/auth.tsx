import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { encoreFetch } from "./encore";

export function useAuth() {
    const [user, setUser] = useState<{ userID: string; role: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("encore-token");
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const data = await encoreFetch("/auth/me");
                setUser(data);
            } catch (error) {
                console.error("Auth check failed:", error);
                localStorage.removeItem("encore-token");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const logout = async () => {
        try {
            await encoreFetch("/auth/logout", { method: "POST" });
        } catch (e) {
            console.error("Logout error:", e);
        } finally {
            localStorage.removeItem("encore-token");
            setUser(null);
            router.push("/login");
        }
    };

    return { user, loading, logout };
}

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className= "min-h-screen flex items-center justify-center bg-zinc-950" >
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500" > </div>
                </div>
        );
    }

    if (!user) return null;

    return <>{ children } </>;
}
