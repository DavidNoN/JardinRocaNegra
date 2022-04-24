export type IPlant = {
    id: number;
    name: string;
    description: string;
    'price-collector': number;
    'price-wholesale': number;
    size: string[];
    quantity: number;
    wholesale: boolean;
    cultivation: string[];
    rating: number;
    discount: number;
    'discount-wholesale' : number;
    photos: string[];
    publishDate: string;
    state: boolean;
    // gender?: string;
    // family: string;
}
