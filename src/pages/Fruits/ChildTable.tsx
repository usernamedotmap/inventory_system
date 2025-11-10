import { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  ProductTypes,
  searchByName,
  useProductStore,
} from "../../hooks/Products/useProducts";
import { PencilIcon, TrashBinIcon } from "../../icons";
import { formatDateTime } from "../../lib/utils";
import FruitsEditModal from "./FruitsEditModal";
import { useHydrationProducs } from "../../hooks/Hyrdation/useHydrationProducts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductsMutation } from "../../lib/api";
import { toast } from "sonner";
import DeleteFruitsModal from "./DeleteFruitsModal";

const ChildTable = () => {
  // const [isReady, setIsReady] = useState(false);
  useHydrationProducs();
  const [deleteFruits, setDeleteFruits] = useState<ProductTypes | null>(null);
  const [editFruits, setEditFruits] = useState<ProductTypes | null>(null);

  const { products } = useProductStore();
  const searchTerm = searchByName((state) => state.searchTerm);

  const sortedProducts = useMemo(() => {
  return [...products]
    .filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));
}, [products, searchTerm]);


  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteProductsMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Fruits deleted successfully.");
    },
    onError: () => {
      toast.error("Delete the fruit item in the inventory section 1st :/");
    },
  });

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              {[
                "Fruits Name",
                "Unit",
                "Price",
                "Created",
                "Status",
                "Actions",
              ].map((header) => (
                <TableCell
                  key={header}
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {sortedProducts.map((fruits) => {
              const formatted = formatDateTime(fruits.createdAt);

              return (
                <TableRow key={fruits.id}>
                  <TableCell className="px-5 py-3 font-bold text-gray-500 text-center text-theme-sm dark:text-gray-400">
                    {fruits.name}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                    {fruits.unit}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                    {fruits.price} &#8369;
                  </TableCell>
                  <TableCell className="px-5 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                    {formatted.dateDay}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                    {fruits.available ? (
                      <p className="text-green-400">Available</p>
                    ) : (
                      <p className="text-red-500">Unavailable</p>
                    )}
                  </TableCell>

                  <TableCell className="px-5 py-3 text-gray-500   text-theme-sm dark:text-gray-400">
                    <div className="flex justify-center items-center gap-4">
                      <button
                        className="p-2 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition"
                        onClick={() => setEditFruits(fruits)}
                      >
                        <PencilIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                      </button>
                      {editFruits?.id === fruits.id && (
                        <FruitsEditModal
                          item={editFruits}
                          onClose={() => setEditFruits(null)}
                        />
                      )}

                      <button
                        disabled={mutation.isPending}
                        className="p-2 rounded hover:bg-red-400 dark:hover:bg-red-400 transition"
                        onClick={() => setDeleteFruits(fruits)}
                      >
                        {mutation.isPending ? (
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
                        ) : (
                          <TrashBinIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        )}
                      </button>
                      {deleteFruits?.id === fruits.id && (
                        <DeleteFruitsModal
                          onClose={() => setDeleteFruits(null)}
                          onConfirm={() => {
                            if (deleteFruits) {
                              mutation.mutate({ id: deleteFruits.id });
                              setDeleteFruits(null);
                            }
                          }}
                        />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ChildTable;
