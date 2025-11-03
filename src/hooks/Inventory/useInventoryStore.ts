import { create } from "zustand";

export type InventoryTypes = {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  restockThreshold: number;
  warehouseLocation: string;
  lastUpdated: string;

  spoilageQuantity?: number;
  expirationDate?: Date | string;
  isExpired?: boolean;
};

type InventoryStore = {
  inventory: InventoryTypes[];
  setInventory: (data: InventoryTypes[]) => void;
};

// const isExpired = expirationDate && new Date(expirationDate) < new Date();

export const useInventoryStore = create<InventoryStore>((set) => ({
  inventory: [],
  setInventory: (data) => set({ inventory: data }),
}));
