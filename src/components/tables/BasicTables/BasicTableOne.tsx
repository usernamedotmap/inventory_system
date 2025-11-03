import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { formatDateTime } from "../../../lib/utils";

import {
  InventoryTypes,
  useInventoryStore,
} from "../../../hooks/Inventory/useInventoryStore";
import { useModal } from "../../../hooks/useModal";
import { useState } from "react";
import { InventoryDetailsModal } from "./InventoryDetailsModal";
import { PencilIcon, TrashBinIcon } from "../../../icons";
import InventoryEditModal from "./InventoryEditModal";
import DeleteModalInventory from "../../../pages/Inventory/DeleteModalInventory";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteInventoryMutation } from "../../../lib/api";
import { toast } from "sonner";

// Define the table data using the interface

export default function BasicTableOne() {
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedInventory, setSelectedInventory] =
    useState<InventoryTypes | null>(null);
  const [editInventory, setEditInventory] = useState<InventoryTypes | null>(
    null
  );
  const [deleteInventory, setDeleteInventory] = useState<InventoryTypes | null>(
    null
  );

  
  const inventories = useInventoryStore((state) => state.inventory);

  const sortedInventories = [...inventories].sort((a, b) =>
    a.productName.localeCompare(b.productName)
  );

  const quyerClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteInventoryMutation,
    onSuccess: () => {
      quyerClient.invalidateQueries({ queryKey: ["inventory"]})
      toast.success("Inventory item has been deleted");
    },
    onError: () => {
      toast.error("Failed to delete inventory item :/");
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
                "Quantity",
                "RestockThreshold",
                "Last Updated",
                "Details",
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
            {sortedInventories.map((inventory) => {
              const formatted = formatDateTime(inventory.lastUpdated);

              return (
                <TableRow key={inventory.id}>
                  <TableCell className="px-5 py-3 font-bold text-gray-500 text-center text-theme-sm dark:text-gray-400">
                    {inventory.productName}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                    {inventory.quantity}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                    {inventory.restockThreshold}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                    {formatted.dateTime}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                    <button
                      onClick={() => {
                        setSelectedInventory(inventory);
                        openModal();
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      View Details
                    </button>
                    {isOpen && selectedInventory && (
                      <InventoryDetailsModal
                        item={selectedInventory}
                        onClose={() => {
                          setSelectedInventory(null);
                          closeModal();
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-gray-500   text-theme-sm dark:text-gray-400">
                    <div className="flex justify-center items-center gap-4">
                      <button
                        className="p-2 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition"
                        onClick={() => setEditInventory(inventory)}
                      >
                        <PencilIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                      </button>
                      {editInventory?.id === inventory.id && (
                        <InventoryEditModal
                          item={editInventory}
                          onClose={() => setEditInventory(null)}
                        />
                      )}
                      <button
                        className="p-2 rounded hover:bg-red-400 dark:hover:bg-red-400 transition"
                        onClick={() => setDeleteInventory(inventory)}
                      >
                        <TrashBinIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                      </button>
                      {deleteInventory?.id === inventory.id && (
                        <DeleteModalInventory
                          onClose={() => setDeleteInventory(null)}
                          onConfirm={() => {
                            if (deleteInventory) {
                              mutation.mutate({id: deleteInventory.id});
                              setDeleteInventory(null);
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
}
