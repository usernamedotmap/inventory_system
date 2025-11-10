import EcommerceMetrics from "../../components/dashboard/EcommerceMetrics";
import MonthlySalesChart from "../../components/dashboard/MonthlySalesChart";
import StatisticsChart from "../../components/dashboard/StatisticsChart";
import MonthlyTarget from "../../components/dashboard/SpoilageFruitRadial";
import RecentOrders from "../../components/dashboard/RecentOrders";
import DemographicCard from "../../components/dashboard/DemographicCard";
import PageMeta from "../../components/common/PageMeta";
import { getAllProductsMutation } from "../../lib/api";
import { useQuery } from "@tanstack/react-query";
import { useProductStore } from "../../hooks/Products/useProducts";
import { useEffect, useState } from "react";
import Skeleton from "../../components/common/Skeleton";
import FreshFruitRadial from "../../components/dashboard/SpoilageFruitRadial";
import SpoilageFruitRadial from "../../components/dashboard/FreshFruitRadial";
import { useHydrationProducs } from "../../hooks/Hyrdation/useHydrationProducts";

export default function Home() {
  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["products"],
  //   queryFn: getAllProductsMutation,
  // });

  // const setProducts = useProductStore((state) => state.setProducts);
  // const { products, fetchProducts } = useProductStore();
  // const [isReady, setIsReady] = useState(false);

  // useEffect(() => {
  //   if (data?.data) {
  //     setProducts(data.data);
  //     setIsReady(true);
  //   }
  // }, [data, setProducts]);

  // useEffect(() => {
  //   if (products.length === 0) {
  //     fetchProducts().then(() => setIsReady(true));
  //   } else {
  //     setIsReady(false);
  //   }
  // }, [products, fetchProducts]);

  const { isLoading} = useHydrationProducs();
  return (
    <>
      <PageMeta title="Dashboard" description="Main Page" />
      {isLoading ? (
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 md:col-span-6 space-y-4">
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div className="col-span-12 md:col-span-6 space-y-4">
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div className="col-span-12 md:col-span-6 space-y-4">
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div className="col-span-12 md:col-span-6 space-y-4">
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div className="col-span-12 md:col-span-6 space-y-4">
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div className="col-span-12 md:col-span-6 space-y-4">
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 space-y-6 xl:col-span-12">
            <EcommerceMetrics  />

            {/* <MonthlySalesChart /> */}
          </div>

          <div className="col-span-12 xl:col-span-6">
            <SpoilageFruitRadial  />
          </div>

          <div className="col-span-12 xl:col-span-6">
            <FreshFruitRadial />
          </div>

          {/* <div className="col-span-12">
          <StatisticsChart />
        </div> */}

          {/* <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div> */}

          {/* <div className="col-span-12 xl:col-span-12">
          <RecentOrders />
        </div> */}
        </div>
      )}
    </>
  );
}
