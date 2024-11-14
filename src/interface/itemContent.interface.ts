export interface IItemContent {
  setCartItem: React.Dispatch<
    React.SetStateAction<
      | {
          id: number;
          price: number;
          amount: number;
        }
      | undefined
    >
  >;
}
