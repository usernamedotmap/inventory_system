import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import ChildTable from "./ChildTable";
import FruitComponentCard from "./FruitCardComponent";
import { useHydrationProducs } from "../../hooks/Hyrdation/useHydrationProducts";
import Skeleton from "../../components/common/Skeleton";

const ParentTable = () => {
  const { isLoading } = useHydrationProducs();
  return (
    <>
      <PageMeta title="Fruits" description="this is mang edgar Fruits pages" />
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
        <>
          <PageBreadcrumb pageTitle="Fruits" />
          <div className="space-y-6">
            <FruitComponentCard title={`Fruits`} button="Add Fruits">
              <ChildTable />
            </FruitComponentCard>
          </div>
        </>
      )}
    </>
  );
};

export default ParentTable;
