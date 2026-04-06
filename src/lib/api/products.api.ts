import { ProductsResponse } from "@/src/types/product";
import { apiClient } from "./client";

export interface GetProductsParams {
	search?: string;
	category?: string;
	tag?: string;
	sort?: string;
	page?: number;
	limit?: number;
}

export const productsApi = {
	getProducts: (params?: GetProductsParams) =>
		apiClient.get<ProductsResponse>("/products", params),
};
