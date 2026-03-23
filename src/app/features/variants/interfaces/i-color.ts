export interface IColor {
    id: number;
    name: string;
    colorCode: string;
    isDeleted: boolean;
}

export interface ICreate_UpdateColor {
    name: string;
    colorCode: string;
}
