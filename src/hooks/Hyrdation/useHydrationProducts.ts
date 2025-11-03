import { useQuery } from "@tanstack/react-query";
import { getAllInventoryMutation, getAllProductsMutation } from "../../lib/api";
import { useEffect } from "react";
import { useProductStore } from "../Products/useProducts";
import { useInventoryStore } from "../Inventory/useInventoryStore";

export function useHydrationProducs() {
  const { products, setProducts, hasHydrated } = useProductStore();
  const { inventory, setInventory } = useInventoryStore();

  const shouldFetch = !hasHydrated;
  const shouldFetchInventory = inventory.length === 0;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProductsMutation,
    enabled: shouldFetch,
  });

  const inventoryQuery = useQuery({
    queryKey: ["inventory"],
    queryFn: getAllInventoryMutation,
    enabled: shouldFetchInventory,
  });

  useEffect(() => {
    if (data?.data && shouldFetch) {
      setProducts(data.data);
    }
  }, [data, shouldFetch, setProducts]);

  useEffect(() => {
    if (inventoryQuery.data && shouldFetchInventory) {
      setInventory(inventoryQuery.data);
    }
  }, [inventoryQuery.data, shouldFetchInventory, setInventory]);

  return {
    products: products.length > 0 ? products : data?.data ?? [],
    inventory: inventoryQuery.data ?? inventory,
    isLoading: isLoading || inventoryQuery.isLoading,
    isError: isError || inventoryQuery.isError,
  };
}
