import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Select from "../Select";
import MultiSelect from "../MultiSelect";
import { FieldValues, Path, PathValue, UseFormSetValue, UseFormWatch } from "react-hook-form";

type SelectInputsProps<T extends FieldValues, K extends Path<T>> = {
  name: K;
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
  options: { value: PathValue<T, K>; label: string }[];
};

export default function SelectInputs<T extends FieldValues, K extends Path<T>>({
  name,
  setValue,
  watch,
  options,
}: SelectInputsProps<T, K>) {
  const currentValue = watch(name)

  const handleSelectChange = (value: PathValue<T, K>) => {
    let parseValue: PathValue<T, K>  = value as PathValue<T, K>

    if (typeof currentValue === "boolean") {
      parseValue = (value === "true" ) as PathValue<T, K>;
    }
    setValue(name, parseValue);  
  };

  // const [selectedValues, setSelectedValues] = useState<string[]>([]);

  // const multiOptions = [
  //   { value: "1", text: "Option 1", selected: false },
  //   { value: "2", text: "Option 2", selected: false },
  //   { value: "3", text: "Option 3", selected: false },
  //   { value: "4", text: "Option 4", selected: false },
  //   { value: "5", text: "Option 5", selected: false },
  // ];
  return (
      <div className="space-y-6">
  <div className="border border-gray-300 px-3 py-4 rounded-lg">
    <Label>Select</Label>
    <select
      className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      value={String(currentValue)}
      onChange={(e) =>
        handleSelectChange(e.target.value as PathValue<T, K>)
      }
    >
      {options.map((opt) => (
        <option key={String(opt.value)} value={String(opt.value)}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
</div>

  );
}
