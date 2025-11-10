import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import {
  ProductTypes,
  useProductStore,
} from "../../hooks/Products/useProducts";
import { useHydrationProducs } from "../../hooks/Hyrdation/useHydrationProducts";
import { useInventoryStore } from "../../hooks/Inventory/useInventoryStore";

export default function SpoilageFruitRadial() {
  useHydrationProducs();
  const products = useProductStore((state) => state.products);
  const inventory = useInventoryStore((state) => state.inventory);
  // const products = useProductStore((state) => state.products);
  // const total = products.length;
  // const spoilageTotal = products.filter(
  //   (p: ProductTypes) => !p.available
  // ).length;
  const spoilageQuantity = inventory.reduce((total, item) => {
    return total + (item.spoilageQuantity || 0);
  }, 0);
  const itemQuantity = inventory.reduce((total, item) => {
    return total + (item.quantity || 0);
  }, 0);
  const spoilageRatio =
    spoilageQuantity > 0 ? (spoilageQuantity / itemQuantity) * 100 : 0;
  const color =
    spoilageRatio >= 50
      ? "#D92D20"
      : spoilageRatio >= 20
      ? "#F79009"
      : "#039855";

  let spoilageMessage = "";

  if (spoilageRatio >= 50) {
    spoilageMessage =
      "Spoilage is critically high. Immediate action is needed!";
  } else if (spoilageRatio >= 20) {
    spoilageMessage =
      "Spoilage is rising. Consider checking inventory.";
  } else if (spoilageRatio > 0) {
    spoilageMessage = "Spoilage is within acceptable range. Keep monitoring.";
  } else {
    spoilageMessage =
      "No spoilage detected. Inventory is in excellent condition!";
  }

  const series = [parseFloat(spoilageRatio.toFixed(2))  ];
  const options: ApexOptions = {
    colors: [color],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "radialBar",
      height: 330,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -85,
        endAngle: 85,
        hollow: {
          size: "80%",
        },
        track: {
          background: "#E4E7EC",
          strokeWidth: "100%",
          margin: 5, // margin is in pixels
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: "36px",
            fontWeight: "600",
            offsetY: -40,
            color: "#1D2939",
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },
    },
    fill: {
      type: "solid",
      colors: [color],
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Progress"],
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Spoilage Fruits
            </h3>
            <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
              Fruits that are spoiled based on inventory
            </p>
          </div>
        </div>
        <div className="relative ">
          <div className="max-h-[330px]" id="chartDarkStyle">
            <Chart
              options={options}
              series={series}
              type="radialBar"
              height={330}
            />
          </div>
        </div>
        <p className="mx-auto mt-10 w-full max-w-[380px] text-center text-sm text-gray-500 sm:text-base">
          {spoilageMessage}
        </p>
      </div>
    </div>
  );
}
