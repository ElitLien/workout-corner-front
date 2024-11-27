export interface IShop {
  setShopTitle: React.Dispatch<React.SetStateAction<string | undefined>>;
  filteredGoods?: {
    id: number;
    title: string;
    price: number;
    image: string;
    images: {
      id: number;
      url: string;
    }[];
  }[];
}
