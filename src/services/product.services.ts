import { AxiosError } from "axios";
import { ProductData } from "./baseData";
import { handleAxiosError } from "./errorHanddling.services";

// const ProductBaseUrl = `${BaseUrl}/product`;

export const RegisterProduct = async (data: ProductData) => {
  try {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const response = {
      status: 200,
      data: { id: products.length + 1, ...data },
    };
    localStorage.setItem(
      "products",
      JSON.stringify([{ id: products.length + 1, ...data }, ...products])
    );
    return response;
  } catch (error) {
    handleAxiosError(error as AxiosError);
    throw error;
  }
};

export const UpdateProduct = async (data: ProductData) => {
  const productId = data.id;

  try {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const updatedproducts = products.map((product: ProductData) => {
      if (product.id === productId) {
        return { ...product, ...data };
      }
      return product;
    });
    const response = { status: 200, data: data };
    localStorage.setItem("products", JSON.stringify(updatedproducts));
    return response;
  } catch (error) {
    handleAxiosError(error as AxiosError);
    throw error;
  }
};

export const DeleteProduct = async (data: ProductData) => {
  const productId = data.id;
  try {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const updatedproducts = products.filter(
      (product: ProductData) => product.id !== productId
    );
    const response = { status: 200, data: data };
    localStorage.setItem("products", JSON.stringify(updatedproducts));
    return response;
  } catch (error) {
    handleAxiosError(error as AxiosError);
    throw error;
  }
};

export const GetProducts = async () => {
  try {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const response = { status: 200, data: products };
    return response;
  } catch (error) {
    handleAxiosError(error as AxiosError);
    throw error;
  }
};

export const GetOneProduct = async (id: number) => {
  try {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const product = products.find((product: ProductData) => product.id === id);
    const response = { status: 200, data: product };
    return response;
  } catch (error) {
    handleAxiosError(error as AxiosError);
    throw error;
  }
};
