import React from "react";
import { InventoryTypes } from "../../../hooks/Inventory/useInventoryStore";
import InventoryForm from "../../../pages/Forms/InventoryForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editInventoryMutation } from "../../../lib/api";
import { toast } from "sonner";

type InventoryEditModalProps = {
  item: InventoryTypes;
  onClose: () => void;
};

const InventoryEditModal = ({ item, onClose }: InventoryEditModalProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: editInventoryMutation,
    onSuccess: () => {
      toast.success("Inventory updated");
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      onClose();
    },
    onError: (err) => toast.error("Update Failed"),
  });

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-4xl max-h-[90vh] rounded-xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-900">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Edit {item.productName} Inventory
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <InventoryForm
          item={item}
          onSubmit={(data) =>
            mutation.mutate({
              id: item.id,
              ...data,
              expirationDate: data.expirationDate?.toISOString(),
            })
          }
          isLoading={mutation.isPending}
        />
      </div>
    </div>
  );
};

export default InventoryEditModal;
