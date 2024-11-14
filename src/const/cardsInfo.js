import barbell_image from "../images/image-1.jpg";
import bars_image from "../images/image-2.jpg";
import bench_image from "../images/image-3.jpg";
import dumbbell_image from "../images/image-4.jpg";
import expander_image from "../images/image-5.jpg";
// import jump_rope_image from "../images/jump_rope.png";

export const cardsInfo = [
  {
    id: 1,
    title: "Barbell",
    price: 1000,
    image: barbell_image,
    images: [
      { id: 1, url: barbell_image },
      { id: 2, url: bars_image },
      { id: 3, url: bench_image },
    ],
  },
  {
    id: 2,
    title: "Bars",
    price: 2000,
    image: bars_image,
    images: [
      { id: 1, url: bars_image },
      { id: 2, url: bench_image },
      { id: 3, url: dumbbell_image },
    ],
  },
  {
    id: 3,
    title: "Bench",
    price: 3000,
    image: bench_image,
    images: [
      { id: 1, url: bench_image },
      { id: 2, url: dumbbell_image },
      { id: 3, url: expander_image },
    ],
  },
  {
    id: 4,
    title: "Dumbbell",
    price: 4000,
    image: dumbbell_image,
    images: [
      { id: 1, url: dumbbell_image },
      { id: 2, url: expander_image },
      { id: 3, url: barbell_image },
    ],
  },
  {
    id: 5,
    title: "Expander",
    price: 5000,
    image: expander_image,
    images: [
      { id: 1, url: expander_image },
      { id: 2, url: barbell_image },
      { id: 3, url: bars_image },
    ],
  },
  // {
  //   id: 6,
  //   title: "Jump rope",
  //   price: 6000,
  //   image: jump_rope_image,
  //   images: [
  //     { id: 1, url: jump_rope_image },
  //     { id: 2, url: barbell_image },
  //     { id: 3, url: bars_image },
  //   ],
  // },
];
