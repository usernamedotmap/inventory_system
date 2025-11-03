import { create } from "zustand";

// type ProductMetricStore = {
//   totalProducts: number;
//   setTotalProducts: (count: number) => void;
// };

export type ProductTypes = {
  id: string;
  name: string;
  unit: 'PIECE' | 'KG' | 'BUNDLE' | 'BOX';
  imgUrl?: string;
  price: number;
  createdAt: string;
  available: boolean;
};

type ProductStore = {
  products: ProductTypes[];
  hasHydrated: boolean;
  setProducts: (data: ProductTypes[]) => void;
  // fetchProducts: () => Promise<void>
}

export const useProductStore = create<ProductStore>((set) => ({
products: [],
hasHydrated: false,
setProducts: (data) => set({products: data})
// fetchProducts: async () => {
//     const response = await getAllProductsMutation();
//     set({ products: response.data });
//   },

}));
