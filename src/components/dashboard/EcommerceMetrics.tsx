import FruitMetricCard from "./FruitMetricCard";
import {
  useProductStore,
  ProductTypes,
} from "../../hooks/Products/useProducts";
import { useHydrationProducs } from "../../hooks/Hyrdation/useHydrationProducts";

export default function EcommerceMetrics() {

    useHydrationProducs()
    const products = useProductStore((state) => state.products);
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
      {products.map((product: ProductTypes) => (
        <FruitMetricCard
          key={product.id}
          name={product.name}
          unit={product.unit}
          price={product.price}
          available={product.available}
        />
      ))}
    </div>
  );
}
