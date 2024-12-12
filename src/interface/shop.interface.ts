export interface IShop {
  setShopId: React.Dispatch<React.SetStateAction<number | undefined>>;
  dbFilteredGoods?: {
    id: number;
    created_at: string;
    description: string;
    image: string;
    name: string;
    price: number;
    category_id: number;
  }[];
}
