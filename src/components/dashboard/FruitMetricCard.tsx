import Badge from "../ui/badge/Badge";
import { ArrowDownIcon, ArrowUpIcon, Fruits } from "../../icons";
import { useInventoryStore } from "../../hooks/Inventory/useInventoryStore";

const FruitMetricCard = ({
  name,
  unit,
  price,
  available,
}: {
  name: string;
  price: string;
  unit: string;
  available: boolean;
}) => {

    const inventory = useInventoryStore((state) => state.inventory);
    const fruits = inventory.find((item) => item.productName === name);

    const status = fruits ? !fruits.isExpired : false;
    
    const stringToNumber = parseFloat(price);
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
        <Fruits className="text-gray-800 size-6 dark:text-white/90" />
      </div>
      <div className="flex items-end justify-between mt-5">
        <div>
          <span className="text-lg text-gray-500 dark:text-gray-400">
            {name}
          </span>
          <h4 className="mt-2 font-bold text-gray-800 text-title-xs dark:text-white/90">
            {stringToNumber.toLocaleString('en-PH', {
                style: "currency",
                currency: 'PHP',
            })} / {unit}
          </h4>
          
        </div>

        <Badge color={available ? "success" : "error"}>
          {available ? <ArrowUpIcon /> : <ArrowDownIcon />  }
          {available ? "Available" : "Unavailable"}
        </Badge>
      </div>
    </div>
  );
};

export default FruitMetricCard;
