export interface ICategory {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    // products?: Product[];
    isDeleted: boolean;
}

export interface ICreate_UpdateCategory {
    title: string;
    image?: File;
    description: string;
}