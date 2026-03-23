export interface IProductImage {
    url: string;
    altText: string;
    productVariantId: number;
}

export interface ICreateProductImage {
    productImage: File | null;
    altText?: string;
}