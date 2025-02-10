import { Link } from "react-router-dom";
import "./style.css";
import { IShop } from "../../interface/shop.interface";
import { useEffect, useState } from "react";
import WarningModal from "../WarningModal";
import EditModal from "../EditModal";
// import { useEffect, useState } from "react";
// import bars_img from "../../images/bars.png";
// import axios from "axios";

const ShopCards: React.FC<IShop> = ({
  setShopId,
  dbFilteredGoods,
  decodeToken,
}) => {
  const [activeProductId, setActiveProductId] = useState<number | null>(null);
  const [activeWarning, setActiveWarning] = useState<boolean>(false);
  const [activeEdit, setActiveEdit] = useState<boolean>(false);
  const [selectProduct, setSelectProduct] = useState<string>();
  const [selectProductId, setSelectProductId] = useState<number>();
  const [productInfo, setProductInfo] = useState<{
    name: string;
    price: number;
    description: string;
    image: string;
  }>();
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
          const isActive = activeProductId === el.id;
          return (
            <div key={ind} className="shop-card">
              <Link to={`/shop/${el.id}`}>
                <div className="shop-card-image">
                  <img src={`data:image/jpeg;base64,${el.image}`} alt="" />
                </div>
              </Link>
              <div className="shop-card-title-main">
                <h2
                  className="shop-card-title"
                  onClick={() => setShopId(el.id)}
                >
                  <Link to={`/shop/${el.id}`} className="shop-card-t">
                    {el.name}
                  </Link>
                  {decodeToken?.role === "MODERATOR" ||
                  decodeToken?.role === "ADMIN" ? (
                    <>
                      <div
                        className="shop-card-dots"
                        onClick={() =>
                          setActiveProductId((prev) =>
                            prev === el.id ? null : el.id
                          )
                        }
                      >
                        ︙
                      </div>
                      {isActive && (
                        <div className="shop-cards-product-window">
                          <div
                            className="shop-cards-product-window-edit"
                            onClick={() => {
                              setActiveEdit((prev) => !prev);
                              setProductInfo({
                                name: el.name,
                                price: el.price,
                                description: el.description,
                                image: `data:image/jpeg;base64,${el.image}`,
                              });
                              setSelectProductId(el.id);
                            }}
                          >
                            Edit product 🖋
                          </div>
                          <div
                            className="shop-cards-product-window-delete"
                            onClick={() => {
                              setActiveWarning((prev) => !prev);
                              setSelectProduct(el.name);
                              setSelectProductId(el.id);
                            }}
                          >
                            Delete product ⨯
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div></div>
                  )}
                </h2>
              </div>
              <p className="shop-card-price">{`$${el.price}`}</p>
            </div>
          );
        })}
      {activeWarning && (
        <WarningModal
          setActiveWarning={setActiveWarning}
          selectProduct={selectProduct}
          selectProductId={selectProductId}
        />
      )}
      {activeEdit && (
        <EditModal
          setActiveEdit={setActiveEdit}
          productInfo={productInfo}
          selectProductId={selectProductId}
        />
      )}
    </>
  );
};

export default ShopCards;
