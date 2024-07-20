import { useState } from "react";
import { ProductData } from "../services/baseData";
import {
  DeleteProduct,
  GetOneProduct,
  RegisterProduct,
  UpdateProduct,
  GetProducts,
} from "../services/product.services";

export default function useProduct() {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [products, setProducts] = useState<ProductData[]>([]);

  const fetchProduct = async (productId: number) => {
    try {
      const response = await GetOneProduct(productId);

      setProduct(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const fetchAllProducts = async () => {
    try {
      const response = await GetProducts();
      setProducts(response.data);
    } catch (error) {
      throw error;
    }
  };

  const createProduct = async (productData: ProductData) => {
    try {
      const response = await RegisterProduct(productData);
      setProduct(response.data);
    } catch (error) {
      throw error;
    }
  };

  const updateProduct = async (productData: ProductData) => {
    try {
      const response = await UpdateProduct(productData);
      setProduct(response.data);
    } catch (error) {
      throw error;
    }
  };

  const deleteProduct = async (product: ProductData) => {
    try {
      await DeleteProduct(product);
      setProduct(null);
    } catch (error) {
      throw error;
    }
  };

  return {
    product,
    products,
    fetchProduct,
    fetchAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}
