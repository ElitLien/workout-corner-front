export interface IGoodsList {
  searchResult: () =>
    | {
        id: number;
        title: string;
        price: number;
        image: string;
        images: {
          id: number;
          url: string;
        }[];
      }[];
  setFilteredGoods:
    | React.Dispatch<
        React.SetStateAction<
          {
            id: number;
            title: string;
            price: number;
            image: string;
            images: {
              id: number;
              url: string;
            }[];
          }[]
        >
      >
    | undefined;
  setFocusHandler?: React.Dispatch<React.SetStateAction<boolean>>;
  timeoutIDRef?: React.MutableRefObject<NodeJS.Timeout | null>;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  setInputValue?: React.Dispatch<React.SetStateAction<string>>;
}
