import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../App";
import "./style.css";

interface IAddModal {
  setActiveAddModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddModal: React.FC<IAddModal> = ({ setActiveAddModal }) => {
  const [goodsArr, setGoodsArr] = useState<
    { name: string; price: number; description: string; category: string }[]
  >([{ name: "", price: 0, description: "", category: "" }]);

  const [inputValues, setInputValues] = useState(goodsArr);

  const context = useContext(ModalContext);
  const { modal } = context;

  useEffect(() => {
    if (modal) {
      document.body.classList.add("active-modal");
    }
    return () => {
      document.body.classList.remove("active-modal");
    };
  }, [modal]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setGoodsArr(inputValues);
    }, 500);

    return () => clearTimeout(timeout);
  }, [inputValues]);

  const handleInputChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    setInputValues((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  useEffect(() => {
    console.log("inputValues: ", inputValues);
  }, [goodsArr]);

  return (
    <div className="add-modal">
      <div
        className="add-modal-overlay"
        onClick={() => setActiveAddModal((prev) => !prev)}
      ></div>

      <div className="add-modal-content">
        <h3 className="add-modal-content-title">Add product</h3>
        <div className="add-modal-content-main">
          {inputValues.map((el, ind) => {
            return (
              <div key={ind} className="add-modal-content-main-form">
                {ind > 0 && (
                  <div
                    className="add-modal-content-main-close"
                    onClick={() =>
                      setInputValues((prev) =>
                        prev.filter((_, index) => ind !== index)
                      )
                    }
                  >
                    🗙
                  </div>
                )}
                <div className="add-modal-content-main-label">
                  Product {ind + 1}
                </div>
                <label>Name</label>
                <input
                  type="text"
                  className="add-modal-content-main-name"
                  placeholder="Product name..."
                  value={inputValues[ind].name}
                  onChange={(e) =>
                    handleInputChange(ind, "name", e.target.value)
                  }
                />

                <label>Price</label>
                <input
                  type="number"
                  className="add-modal-content-main-price"
                  placeholder="Product price..."
                  value={inputValues[ind].price}
                  onChange={(e) =>
                    handleInputChange(ind, "price", Number(e.target.value))
                  }
                />

                <div className="add-modal-content-main-description-block">
                  <label>Description</label>
                  <textarea
                    id="add-modal-content-main-description"
                    value={inputValues[ind].description}
                    onChange={(e) =>
                      handleInputChange(ind, "description", e.target.value)
                    }
                  ></textarea>
                </div>

                <label>Category</label>
                <select
                  name="categories"
                  id="select-categories"
                  value={inputValues[ind].category}
                  onChange={(e) =>
                    handleInputChange(ind, "category", e.target.value)
                  }
                >
                  <option value="Training equipment">Training equipment</option>
                  <option value="Food">Food</option>
                  <option value="Protein">Protein</option>
                  <option value="Drinks">Drinks</option>
                  <option value="Bottle">Bottle</option>
                </select>

                <label>Image</label>
                <input
                  type="file"
                  className="add-modal-content-main-image"
                  accept="image/*"
                />
              </div>
            );
          })}
        </div>

        <div className="add-modal-content-button">
          <button
            className="add-modal-content-button-add"
            onClick={() => {
              console.log("setGoodsArr");
              setInputValues((prev) => [
                ...prev,
                {
                  name: "",
                  price: 0,
                  description: "",
                  category: "",
                },
              ]);
            }}
          >
            Add form
          </button>
        </div>

        <div className="add-modal-content-footer">
          <div className="add-modal-content-footer-element-yes">Add</div>
          <div
            className="add-modal-content-footer-element-no"
            onClick={() => setActiveAddModal((prev) => !prev)}
          >
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
