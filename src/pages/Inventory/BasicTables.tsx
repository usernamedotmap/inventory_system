import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";
import { useInventoryStore } from "../../hooks/Inventory/useInventoryStore";
import { useQuery } from "@tanstack/react-query";
import { getAllInventoryMutation } from "../../lib/api";
import { useEffect } from "react";
import CardForInvetory from "../../components/common/CardForInventory";
import Skeleton from "../../components/common/Skeleton";


export default function BasicTables() {
  const setInventory = useInventoryStore((state) => state.setInventory);

  const {data, isLoading } = useQuery({
    queryKey: ["inventory"],
    queryFn: getAllInventoryMutation
  });

  useEffect(() => {
    if (data && data.length > 0) {
      setInventory(data);
    }
  }, [data, setInventory])

  return (
    <>
      <PageMeta
        title="Inventory"
        description="this is mang edgar Inventory pages"
      />
      {isLoading ? (<div className="grid grid-cols-12 gap-4 md:gap-6">
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
        </div>)
        
        : (
          <>
           <PageBreadcrumb pageTitle="Inventory" />  
      <div className="space-y-6">
        <CardForInvetory title={`Inventory`} button="Add Inventory">
          <BasicTableOne />
        </CardForInvetory>
      </div>
      </>
        ) }
     
    </>
  );
}
