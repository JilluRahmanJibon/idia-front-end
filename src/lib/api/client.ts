export const apiClient = {
	baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050",

	async post<T>(path: string, body: unknown): Promise<T> {
		const res = await fetch(`${this.baseUrl}${path}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include", 
			body: JSON.stringify(body),
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "Something went wrong");
		return data;
	},

	async get<T>(path: string): Promise<T> {
		const res = await fetch(`${this.baseUrl}${path}`, {
			headers: { "Content-Type": "application/json" },
			credentials: "include",  
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "Something went wrong");
		return data;
	},
};
