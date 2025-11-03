import React from 'react'
import { FruitsSchema } from '../../lib/validation';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Label from '../../components/form/Label';
import Input from '../../components/form/input/InputField';
import SelectInputs from '../../components/form/form-elements/SelectInputs';


export type FruitFormValues = z.infer<typeof FruitsSchema>;

type FruitFormProps = {
  onSubmit: (data: FruitFormValues) => Promise<void> | void;
  isLoading?: boolean;
};

const FruitsAddForm = ({onSubmit, isLoading}: FruitFormProps) => {
     const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
      } = useForm<FruitFormValues>({
        resolver: zodResolver(FruitsSchema),
        defaultValues: {
          name: "",
          unit: "PIECE",
          price: 0,
          createdAt: new Date().toISOString(),
          available: true,
        },
      });
  return (
     <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <div>
        <Label htmlFor="name">Fruits Name</Label>
        <Input type="text" {...register("name")} />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="price">Price</Label>
        <Input type="number" {...register("price", { valueAsNumber: true})} />
        {errors.price && (
          <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="unit">Unit</Label>
        <SelectInputs
          name="unit"
          watch={watch}
          setValue={setValue}
          options={[
            { value: "PIECE", label: "Piece" },
            { value: "KG", label: "Kilogram" },
            { value: "BUNDLE", label: "Bundle" },
            { value: "BOX", label: "Box" },
          ]}
        />
        {errors.unit && (
          <p className="text-red-500 text-xs mt-1">{errors.unit.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="available">Availability</Label>
        <SelectInputs
        watch={watch}
          name="available"
          setValue={setValue}
          options={[
            {
              value: true,
              label: "Available",
            },
            {
              value: false,
              label: "Unavailable",
            },
          ]}
        />
        {errors.available && (
          <p className="text-red-500 text-xs mt-1">
            {errors.available.message}
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
  )
}

export default FruitsAddForm
