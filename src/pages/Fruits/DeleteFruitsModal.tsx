
const DeleteFruitsModal = ({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: () => void;
}) => {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-white/[0.05] dark:bg-white/[0.03]">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">
          Confirm Deletion
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-6">
          Are you sure you want to delete this fruits item? This action
          cannot be undone.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteFruitsModal;
