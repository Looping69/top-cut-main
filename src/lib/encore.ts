const BASE_URL = process.env.NEXT_PUBLIC_ENCORE_API_URL || "http://localhost:4000";

export async function encoreFetch(path: string, options: RequestInit = {}) {
    const url = `${BASE_URL}${path}`;

    // Get token from localStorage if available (client-side only)
    let token = null;
    if (typeof window !== "undefined") {
        token = localStorage.getItem("encore-token");
    }

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...((options.headers as Record<string, string>) || {}),
    };

    if (token) {
        headers["X-Auth-Token"] = token;
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "An error occurred" }));
        throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    if (response.status === 204) return null;
    const contentLength = response.headers.get("content-length");
    const contentType = response.headers.get("content-type") ?? "";
    if (contentLength === "0" || !contentType.includes("application/json")) return null;
    return response.json();
}
