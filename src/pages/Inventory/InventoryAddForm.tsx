import { useForm } from "react-hook-form";
import z from "zod";
import { InventoryAddSchema } from "../../lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import DatePicker from "../../components/form/date-picker";

export type InventoryFormValues = z.infer<typeof InventoryAddSchema>;

type InventoryFormProps = {
  onSubmit: (data: InventoryFormValues) => Promise<void> | void;
  products: { id: string; name: string }[];
  isLoading?: boolean;
};

const InventoryAddForm = ({ onSubmit, products, isLoading }: InventoryFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<InventoryFormValues>({
    resolver: zodResolver(InventoryAddSchema),
    defaultValues: {
      productId: products[0]?.id ?? "",
      quantity: 0,
      restockThreshold: 0,
      warehouseLocation: "",
      spoilageQuantity: 0,
      expirationDate: undefined,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <div>
        <Label htmlFor="productId">Select Product</Label>
        <select
          id="productId"
          {...register("productId")}
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        >
          <option value="">-- Select a fruit --</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
        {errors.productId && (
          <p className="text-red-500 text-xs mt-1">
            {errors.productId.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          type="number"
          {...register("quantity", { valueAsNumber: true })}
        />
        {errors.quantity && (
          <p className="text-red-500 text-xs mt-1">{errors.quantity.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="spoilageQuantity">Spoiled</Label>
        <Input
          type="number"
          {...register("spoilageQuantity", { valueAsNumber: true })}
        />
        {errors.spoilageQuantity && (
          <p className="text-red-500 text-xs mt-1">
            {errors.spoilageQuantity.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="restockThreshold">Restock Threshold</Label>
        <Input
          type="number"
          {...register("restockThreshold", { valueAsNumber: true })}
        />
        {errors.restockThreshold && (
          <p className="text-red-500 text-xs mt-1">
            {errors.restockThreshold.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="warehouseLocation">Warehouse</Label>
        <Input type="text" {...register("warehouseLocation")} />
        {errors.warehouseLocation && (
          <p className="text-red-500 text-xs mt-1">
            {errors.warehouseLocation.message}
          </p>
        )}
      </div>

      <div>
        <DatePicker
          id="expirationDate"
          label="Expiration Date"
          placeholder="Select a date"
          onChange={(dates, currentDateString) => {
            setValue("expirationDate", dates[0]);
          }}
        />
        {errors.expirationDate && (
          <p className="text-red-500 text-xs mt-1">
            {errors.expirationDate.message}
          </p>
        )}
      </div>

      <div className="col-span-2">
        <button
          type="submit"
          disabled={isLoading}
          className={`px-4 py-2 text-white rounded transition ${
            isLoading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
           {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="w-4 h-4 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Adding...
            </span>
          ) : (
            "Add"
          )}
        </button>
      </div>
    </form>
  );
};

export default InventoryAddForm;
