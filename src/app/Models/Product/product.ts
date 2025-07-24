export interface Product {
}

export interface NewProduct {
    name: string;
    description: string;
    image: string[];
    categoryId: string;
    productType: ProductType["Simple"] | ProductType["Variable"];
}

export interface ProductType {
    Simple: string;
    Variable: string;
}

export interface Create_UpdateProductVarient {
    colorId: number;
    sizeId: number;
    price: number;
    stock: number;
    sku: string;
    barcode: string;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    image: string;
    categoryId?: string;
    productType?: ProductType["Simple"] | ProductType["Variable"];
    varients?: Create_UpdateProductVarient[];
}


// This interface is used to define the structure of a category object
export interface Category {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    products: Product[];
    isDeleted: boolean;
}

export interface Create_UpdateCategory {
    name: string;
    description: string;
    image: string;
}