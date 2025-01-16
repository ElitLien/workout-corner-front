export interface IShop {
  setShopId: React.Dispatch<React.SetStateAction<number | undefined>>;
  dbFilteredGoods?: {
    id: number;
    createdAt: string;
    description: string;
    image: string;
    name: string;
    price: number;
    categoryId: number;
  }[];
}
