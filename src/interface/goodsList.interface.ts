import { IDbStorage } from "./dbStorage.interface";

export interface IGoodsList {
  searchResult: () =>
    | {
        id: number;
        createdAt: string;
        description: string;
        image: string;
        name: string;
        price: number;
        categoryId: number;
      }[];
  setDbFilteredGoods?: React.Dispatch<
    React.SetStateAction<IDbStorage[] | undefined>
  >;
  setFocusHandler?: React.Dispatch<React.SetStateAction<boolean>>;
  timeoutIDRef?: React.MutableRefObject<NodeJS.Timeout | null>;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  setInputValue?: React.Dispatch<React.SetStateAction<string>>;
}
