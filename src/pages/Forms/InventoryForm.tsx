import React from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { InventorySchema } from "../../lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import DatePicker from "../../components/form/date-picker";
import { InventoryTypes } from "../../hooks/Inventory/useInventoryStore";

export type InventoryFormValues = z.infer<typeof InventorySchema>;

type InventoryFormProps = {
  item: InventoryTypes;
  onSubmit: (data: InventoryFormValues) => Promise<void> | void;
  isLoading?: boolean;
};

const InventoryForm = ({ onSubmit, item, isLoading }: InventoryFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<InventoryFormValues>({
    resolver: zodResolver(InventorySchema),
    defaultValues: {
      quantity: item.quantity,
      restockThreshold: item.restockThreshold,
      warehouseLocation: item.warehouseLocation,
      spoilageQuantity: item.spoilageQuantity,
      expirationDate: item.expirationDate
        ? new Date(item.expirationDate)
        : undefined,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
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
        <Controller
          control={control}
          name="expirationDate"
          render={({ field }) => (
            <DatePicker
              id="expirationDate"
              label="Expiration Date"
              placeholder="Select a date"
              value={field.value}
              onChange={(dates) => field.onChange(dates[0])}
            />
          )}
        />

        {errors.expirationDate && (
          <p className="text-red-500 text-xs mt-1">
            {errors.expirationDate.message}
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

      <div className="col-span-2">
        <button
          disabled={isLoading}
          type="submit"
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
              Saving...
            </span>
          ) : (
            "Save"
          )}
        </button>
      </div>
    </form>
  );
};

export default InventoryForm;
