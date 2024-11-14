export interface ICartItem {
  content: { id: number; amount: number };
  onRemoveItem: (id: number) => void;
  onAddAmount: (id: number) => void;
  onRemoveAmount: (id: number) => void;
}
