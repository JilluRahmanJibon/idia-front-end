import { apiClient } from "@/services/apiClient";
import { SavedItem } from "./types";


export const savedApi = {
	getMySaved: () => apiClient.get<SavedItem[]>("/saved/my"),
	removeFromSaved: (productId: string) =>
		apiClient.delete<void>(`/saved/${productId}`),
};
