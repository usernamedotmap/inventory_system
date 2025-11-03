import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import BarChartOne from "../../components/charts/bar/BarChartOne";
import PageMeta from "../../components/common/PageMeta";
import { useInventoryStore } from "../../hooks/Inventory/useInventoryStore";
import { useHydrationProducs } from "../../hooks/Hyrdation/useHydrationProducts";

export default function BarChart() {
  useHydrationProducs();
  const inventory = useInventoryStore((state) => state.inventory);

 const spoilageMap: Record<string, number> = {};

 inventory.forEach((item) => {
  const name = item?.productName || "unknown";
  const spoilage = item.spoilageQuantity || 0;
  spoilageMap[name] = (spoilageMap[name] || 0) + spoilage;
 });

 const categories = Object.keys(spoilageMap);
 const data = Object.values(spoilageMap);

  const series = [
    {
      name: "Spoilage Quantity",
      data,
    },
  ];

  return (
    <div>
      <PageMeta
        title="Bar Chart"
        description="This is the bar chart of mang edgar inventory"
      />
      <PageBreadcrumb pageTitle="Bar Chart" />
      
      <div className="space-y-6">
        <ComponentCard title="Spoilage quantity by Fruit Type">
          <BarChartOne series={series} categories={categories} />
        </ComponentCard>
      </div>  
    </div>
  );
}
