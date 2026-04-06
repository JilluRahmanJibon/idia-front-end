export function formatPrice(price: number, currency: "USD" | "BDT" = "USD") {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency,
		maximumFractionDigits: 0,
	}).format(price);
}
