import React from "react";
import { Plan } from "../types";


interface PlanCardProps {
  plan: Plan;
  isSelected: boolean;
  onSelect: (plan: Plan) => void;
  formatCurrency: (priceInUsd: number) => string;
}

export const PlanCard: React.FC<PlanCardProps> = ({ plan, isSelected, onSelect, formatCurrency }) => {
  return (
    <div
      className={`border rounded-xl p-4 cursor-pointer transition ${
        isSelected ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
      onClick={() => onSelect(plan)}
    >
      <h3 className="text-lg font-bold">{plan.name}</h3>
      <p className="text-sm text-gray-600">{formatCurrency(plan.price)}</p>
      <ul className="text-sm mt-2">
        {plan.features.map((f, i) => (
          <li key={i}>• {f}</li>
        ))}
      </ul>
    </div>
  );
};
