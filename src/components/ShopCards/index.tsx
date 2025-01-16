import { Link } from "react-router-dom";
import "./style.css";
import { IShop } from "../../interface/shop.interface";
import { useEffect } from "react";
// import { useEffect, useState } from "react";
// import bars_img from "../../images/bars.png";
// import axios from "axios";

const ShopCards: React.FC<IShop> = ({ setShopId, dbFilteredGoods }) => {
  // const [image, setImage] = useState<any>("");

  // const createProduct = async () => {     // FOR MODERATOR AND ADMIN
  //   const formData = new FormData();

  //   const productDTO = {
  //     name: "Pirat product",
  //     description: "Serega Pirat's product from God",
  //     categoryId: "1",
  //     price: "10000",
  //   };

  //   console.log("formData before: ", formData);
  //   formData.append(
  //     "product",
  //     new Blob([JSON.stringify(productDTO)], { type: "application/json" })
  //   );

  //   if (image) {
  //     formData.append("image", image);
  //   }

  //   console.log("formData: ", formData);

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8080/api/products/create",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     console.log("Product created successfully:", response.data);
  //   } catch (error) {
  //     console.error("Error creating product:", error);
  //   }
  // };

  // const imageHandler = (e: any) => {
  //   setImage(e.target.files[0]);
  // };

  // const updateProduct = async () => {       // FOR MODERATOR AND ADMIN
  //   const formData = new FormData();

  //   const productDTO = {
  //     name: "GumBean Carpet",
  //     description: "Carpet for physical training",
  //     categoryId: "1",
  //     price: "17.40",
  //   };

  //   console.log("formData before: ", formData);
  //   formData.append(
  //     "product",
  //     new Blob([JSON.stringify(productDTO)], { type: "application/json" })
  //   );

  //   if (image) {
  //     formData.append("image", image);
  //   }

  //   console.log("formData: ", formData);

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8080/api/products/edit/11",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     console.log("Product created successfully:", response.data);
  //   } catch (error) {
  //     console.error("Error creating product:", error);
  //   }
  // };

  // const buttonHandler = (image: any) => {
  //   console.log("Image: ", image);
  // };

  return (
    <>
      {/* <input type="file" accept="image/*" onChange={imageHandler} />
      <button onClick={updateProduct}></button> */}
      {dbFilteredGoods &&
        dbFilteredGoods.map((el, ind) => {
          return (
            <div key={ind} className="shop-card">
              <Link to={`/shop/${el.id}`}>
                <div className="shop-card-image">
                  <img src={`data:image/jpeg;base64,${el.image}`} alt="" />
                </div>
              </Link>
              <h2 className="shop-card-title" onClick={() => setShopId(el.id)}>
                <Link to={`/shop/${el.id}`} className="shop-card-t">
                  {el.name}
                </Link>
              </h2>
              <p className="shop-card-price">{`$${el.price}`}</p>
            </div>
          );
        })}
    </>
  );
};

export default ShopCards;
