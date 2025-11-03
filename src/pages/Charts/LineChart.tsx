import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import LineChartOne from "../../components/charts/line/LineChartOne";
import PageMeta from "../../components/common/PageMeta";
import { useInventoryStore } from "../../hooks/Inventory/useInventoryStore";
import { useHydrationProducs } from "../../hooks/Hyrdation/useHydrationProducts";

export default function LineChart() {
  useHydrationProducs();
  const inventory = useInventoryStore((state) => state.inventory);
  console.log("hello chart", inventory)

  const spoilageByMonth = Array(12).fill(0);
  inventory.forEach((item) => {
    if (item.expirationDate && item.spoilageQuantity) {
      const month = new Date(item.expirationDate).getMonth();
      spoilageByMonth[month] += item.spoilageQuantity;
    }
  });

   const series = [
    {
      name: "Spoilage Quantity",
      data: spoilageByMonth,
    },
  ];

  const categories = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  return (
    <>
      <PageMeta
        title="Line Chart"
        description="This is the line chart of mang edgar inventory"
      />
      <PageBreadcrumb pageTitle="Line Chart" />
      <div className="space-y-6">
        <ComponentCard title="Spoilage quantity trends month by month">
          <LineChartOne categories={categories} series={series} />
        </ComponentCard>
      </div>
    </>
  );
}
