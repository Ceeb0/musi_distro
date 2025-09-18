import React from "react";
import { Plan } from "../types";

interface ConfirmationModalProps {
  plan: Plan | null;
  onConfirm: () => void;
  onClose: () => void;
  formatCurrency: (priceInUsd: number) => string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  plan,
  onConfirm,
  onClose,
  formatCurrency,
}) => {
  if (!plan) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
        <h2 className="text-lg font-bold mb-2">Confirm Subscription</h2>
        <p>
          Subscribe to <strong>{plan.name}</strong> for{" "}
          {formatCurrency(plan.price)}?
        </p>
        <div className="flex justify-end gap-3 mt-4">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
