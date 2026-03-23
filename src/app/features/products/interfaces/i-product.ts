import { ICreateProductVariant, IProductVariant } from "./i-product-variant";

export interface IProduct {
    id: number;
    title: string;
    description: string;
    categoryId?: number;
    categoryName?: string;
    productVariants?: IProductVariant[];
}

export interface ICreateProduct {
    title: string;
    description: string;
    categoryId: number;
    productVariants: ICreateProductVariant[];
}
