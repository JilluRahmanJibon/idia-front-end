import { apiClient } from "./client";

export interface SavedItem {
	id: string;
	savedAt: string;
	product: {
		id: string;
		title: string;
		slug: string;
		thumbnailUrl: string;
		price: number;
		category: {
			name: string;
		};
	};
}

export const savedApi = {
	getMySaved: () => apiClient.get<SavedItem[]>("/saved/me"),
	removeFromSaved: (productId: string) =>
		apiClient.delete<void>(`/saved/${productId}`),
};

