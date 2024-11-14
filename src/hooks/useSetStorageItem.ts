import { ITest } from "../interface/useSetStorageItem.interface";

export const useSetStorageItem = () => {
  const updateStorage = (updatedItems: ITest) => {
    localStorage.setItem("itemContent", JSON.stringify(updatedItems));

    const event = new CustomEvent("localStorageUpdated", {
      detail: { key: "itemContent", newValue: JSON.stringify(updatedItems) },
    });
    window.dispatchEvent(event);
  };

  return updateStorage;
};
