import { useInventoryStore } from "../../hooks/Inventory/useInventoryStore";
import { useProductStore } from "../../hooks/Products/useProducts";
import { useModal } from "../../hooks/useModal";
import AddInventoryModal from "../../pages/Inventory/AddInventoryModal";

interface CardForInvetoryProps {
  title: string;
  children: React.ReactNode;
  className?: string; 
  button: React.ReactNode
}

const CardForInvetory: React.FC<CardForInvetoryProps> = ({
  title,
  children,
  className = "",
  button
}) => {
    const { isOpen, closeModal, openModal } = useModal();
  
  return (

    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      {/* Card Header */}
      <div className="px-6 py-5 flex items-center justify-between">
        <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
          {title}
        </h3>
       <div className="border border-gray-900 p-2 rounded-lg bg-gray-900 text-gray-100 text-base font-medium dark:bg-gray-200 dark:text-gray-900">
          <button className="cursor-pointer" onClick={openModal}>
            {button}
          </button>
            {isOpen && <AddInventoryModal onClose={closeModal} />}
        </div>
       
      </div>

      {/* Card Body */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default CardForInvetory;
