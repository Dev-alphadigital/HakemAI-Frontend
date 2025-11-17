export const API_BASE = "http://localhost:5000/api";

export async function apiPost(path: string, body: any) {
    const res = await fetch(`${API_BASE}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!res.ok) throw data;
    return data;
}