import { InventoryTypes } from "../hooks/Inventory/useInventoryStore";
import { API } from "./axios_client";

export type SigningType = {
  username: string;
  password: string;
};

export type AddProductResponse = {
  name: string;
  unit: "PIECE" | "KG" | "BUNDLE" | "BOX"; // matches Product.Unit enum
  imgUrl?: string;
  price: number; // BigDecimal serialized as string
  available: boolean;
  createdAt: string;
};

export type ProductResponse = {
  id: string; // UUID
  name: string;
  unit: "PIECE" | "KG" | "BUNDLE" | "BOX"; // matches Product.Unit enum
  imgUrl?: string;
  price: number; // BigDecimal serialized as string
  available: boolean;
  createdAt: string; // LocalDateTime serialized as ISO string
};

export type InventoryUpdatePayload = {
  id: string; // Inventory ID
  quantity?: number;
  restockThreshold?: number;
  warehouseLocation?: string;
  spoilageQuantity?: number;
  expirationDate?: string;
};

export type InventoryResponse = {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  restockThreshold: number;
  warehouseLocation: string;
  lastUpdated: string;
  spoilageQuantity?: number;
  expirationDate?: string;
  isExpired: boolean;
};

// authentication

export const signUpMutation = async (data: SigningType) =>
  await API.post("/auth/register", data);

export const signInMutation = async (data: SigningType) =>
  await API.post("/auth/login", data);

// products

export const getAllProductsMutation = async () => await API.get("/products");

export const updateProductsMutation = async (data: ProductResponse) => {
  const { id, ...payload } = data;
  const response = await API.put(`/products/${id}`, payload);
  return response.data;
};

export const addProductsMutation = async (data: AddProductResponse) => {
  const response = await API.post("/products", data);
  return response.data;
};

export const deleteProductsMutation = async (data: { id: string }) => {
  const { id } = data;
  const response = await API.delete(`/products/${id}`);
  return response.data;
};

export const findProductByName = async (data: { name: string }) =>
  API.get("/products/search", {
    params: {
      name: data.name,
    },
  }); 

// inventory
export const getAllInventoryMutation = async (): Promise<InventoryTypes[]> => {
  const response = (await API.get("/inventory")) as InventoryTypes[]; // this is already the array
  return response ?? [];
};

export const editInventoryMutation = async (
  data: InventoryUpdatePayload
): Promise<InventoryResponse> => {
  const { id, ...payload } = data;
  const response = await API.patch(`/inventory/${id}/update`, payload);
  return response.data;
};

export const addInventoryMutation = async (data: InventoryUpdatePayload) => {
  const response = await API.post("/inventory", data);
  return response.data;
};

export const deleteInventoryMutation = async (data: { id: string }) => {
  const { id } = data;
  const response = await API.delete(`/inventory/${id}`);
  return response.data;
};

// export const getExpiredDateMutation = async () => await API.get("/inventory/expired");
