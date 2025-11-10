import { useHydrationProducs } from "../../../hooks/Hyrdation/useHydrationProducts";
import { InventoryTypes } from "../../../hooks/Inventory/useInventoryStore";
import { useProductStore } from "../../../hooks/Products/useProducts";
import { formatDateTime } from "../../../lib/utils";

type InventoryDetailsModalProps = {
  item: InventoryTypes;
  onClose: () => void;
};

export const InventoryDetailsModal = ({
  item,
  onClose,
}: InventoryDetailsModalProps) => {
  const {dateOnly} = formatDateTime(item.expirationDate ?? new Date());
  const expirationDate = (item.expirationDate ?? new Date());
  const isExpired = new Date() > new Date(expirationDate);

  useHydrationProducs();
  const i = useProductStore((state) => state.products);
  const units = i.find((p) => p.name === item.productName);

  
  

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-900">
        {/* Header */}
        <div className="mb-6 border-b pb-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            {item.productName}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Inventory Details
          </p>
        </div>

        {/* Details */}
        <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
          <div className="flex justify-between">
            <span className="font-medium">Quantity:</span>
            <span>{item.quantity}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Unit:</span>
            <span>{units?.unit}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Spoiled:</span>
            <span>{item.spoilageQuantity ?? 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Expires:</span>
            <span>{dateOnly}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Status:</span>
            <span
              className={`font-semibold ${
                isExpired ? "text-red-600" : "text-green-600"
              }`}
            >
              {isExpired ? "Expired" : "Valid"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Warehouse:</span>
            <span>{item.warehouseLocation}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
