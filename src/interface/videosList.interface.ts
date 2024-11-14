export interface IVideosList {
  videosResult: () =>
    | (
        | {
            id: number;
            title: string;
            time: string;
            src: string;
          }
        | {
            id: number;
            title: string;
            price: number;
            image: string;
            images: {
              id: number;
              url: string;
            }[];
          }
      )[];
}
