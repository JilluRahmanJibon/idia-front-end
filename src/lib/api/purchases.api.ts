import { apiClient } from "./client";

export interface Purchase {
	id: string;
	pricePaid: number;
	currency: string;
	status: string;
	purchasedAt: string;
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

export const purchasesApi = {
	getMyPurchases: () => apiClient.get<Purchase[]>("/purchases/me"),
	downloadProduct: (purchaseId: string) =>
		apiClient.get<{ downloadUrl: string }>(`/purchases/${purchaseId}/download`),
};

