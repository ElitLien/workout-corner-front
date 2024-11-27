export interface IVideosList {
  videosResult?: () =>
    | {
        id: number;
        title: string;
        time: string;
        src: string;
      }[];
  setFilteredVideos?: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        title: string;
        time: string;
        src: string;
      }[]
    >
  >;
  setFocusHandler?: React.Dispatch<React.SetStateAction<boolean>>;
  timeoutIDRef?: React.MutableRefObject<NodeJS.Timeout | null>;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  setInputValue?: React.Dispatch<React.SetStateAction<string>>;
}
