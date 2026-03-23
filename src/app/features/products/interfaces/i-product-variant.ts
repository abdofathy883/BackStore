import { ICreateProductImage, IProductImage } from "./i-product-image";

export interface IProductVariant {
  productId: string;
  colorId: number;
  sizeId: number;
  productImage?: IProductImage;
  originalPrice: number;
  salePrice: number;
  wholesalePrice: number;
  stock: number;
  sku: string;
  barcode: string;
}

export interface ICreateProductVariant {
  colorId: number;
  sizeId: number;
  imageFile: ICreateProductImage | null;
  originalPrice: number;
  salePrice: number;
  wholesalePrice: number;
  stock: number;
  sku: string;
  barcode: string;
  isFeatured: boolean;
}
