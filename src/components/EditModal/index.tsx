import { useContext, useEffect, useState } from "react";
import "./style.css";
import { ModalContext } from "../../App";
import axios from "axios";

interface IEditModal {
  setActiveEdit: React.Dispatch<React.SetStateAction<boolean>>;
  productInfo:
    | {
        name: string;
        price: number;
        description: string;
        image: string;
      }
    | undefined;
  selectProductId: number | undefined;
}

const EditModal: React.FC<IEditModal> = ({
  setActiveEdit,
  productInfo,
  selectProductId,
}) => {
  const context = useContext(ModalContext);
  const { modal } = context;
  const [prodName, setProdName] = useState<string>();
  const [prodPrice, setProdPrice] = useState<number>();
  const [prodDescription, setProdDescription] = useState<string>();
  const [prodImage, setProdImage] = useState<string>();
  const [token, setToken] = useState<string>();

  const nameHandler = (e: any) => {
    setProdName(e.target.value);
  };
  const priceHandler = (e: any) => {
    setProdPrice(e.target.value);
  };
  const descriptionHandler = (e: any) => {
    setProdDescription(e.target.value);
  };
  const imageHandler = (e: any) => {
    setProdImage(e.target.files[0]);
  };

  const updateProduct = async () => {
    const formData = new FormData();

    const productDTO = {
      name: prodName || null,
      description: prodDescription || null,
      price: prodPrice || null,
    };

    console.log("formData before: ", formData);
    formData.append(
      "product",
      new Blob([JSON.stringify(productDTO)], { type: "application/json" })
    );

    if (prodImage) {
      formData.append("image", prodImage);
    } else {
      formData.append("image", "");
    }

    console.log("formData: ", formData);

    try {
      const response = await axios.post(
        `http://localhost:8080/api/products/edit/${selectProductId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Product created successfully:", response.data);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  useEffect(() => {
    if (modal) {
      document.body.classList.add("active-modal");
    }
    return () => {
      document.body.classList.remove("active-modal");
    };
  }, [modal]);

  useEffect(() => {
    const localToken = localStorage.getItem("authToken");
    localToken && setToken(localToken);
  }, []);

  return (
    <div className="account-modal">
      <div
        className="account-modal-overlay"
        onClick={() => setActiveEdit((prev) => !prev)}
      ></div>

      <div className="edit-modal-content">
        <h3 className="edit-modal-content-title">Edit product</h3>
        <div className="edit-modal-content-main">
          <label>Name</label>
          <input
            type="text"
            className="edit-modal-content-main-name"
            placeholder={productInfo?.name}
            onChange={nameHandler}
            value={prodName}
          />
          <label>Price</label>
          <input
            type="number"
            className="edit-modal-content-main-price"
            placeholder={productInfo?.price.toString()}
            onChange={priceHandler}
            value={prodPrice}
          />
          <label>Description</label>
          <input
            type="text"
            className="edit-modal-content-main-description"
            placeholder={productInfo?.description}
            onChange={descriptionHandler}
            value={prodDescription}
          />
          <label>Image</label>
          <input
            type="file"
            className="edit-modal-content-main-image"
            onChange={imageHandler}
            accept="image/*"
          />
        </div>
        <div className="edit-modal-content-footer">
          <div
            className="warning-modal-content-footer-element-yes"
            onClick={() => updateProduct()}
          >
            Edit
          </div>
          <div
            className="warning-modal-content-footer-element-no"
            onClick={() => setActiveEdit((prev) => !prev)}
          >
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
