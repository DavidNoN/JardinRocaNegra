export type IPlant = {
    id: number;
    name: string;
    description: string;
    'price-collector': number;
    'price-wholesale': number;
    discount: number;
    'discount-wholesale' : number;
    size: string[];
    quantity: number;
    cultivation: string[];
    wholesale: boolean;
    rating: number;
    photos: string[];
    publishDate: string;
    state: boolean;
}
