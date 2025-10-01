

import React, { useState } from "react";
import { Plan } from "../types";
import { plans } from "../data/plans";
import { PricingCard } from "./PricingCard";
import { SubscriptionPaymentModal } from "./SubscriptionPaymentModal";

interface SubscriptionPageProps {
  currentPlan: Plan | null;
  setCurrentPlan: (plan: Plan) => void;
  formatCurrency: (amount: number) => string;
  setView: (view: string) => void;
}

export const SubscriptionPage: React.FC<SubscriptionPageProps> = ({
  currentPlan,
  setCurrentPlan,
  formatCurrency,
  setView,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectPlan = (plan: Plan) => {
    if (plan.id === currentPlan?.id) return;
    
    if (plan.price === 0) {
      setCurrentPlan(plan);
    } else {
      setSelectedPlan(plan);
      setIsModalOpen(true);
    }
  };

  const handleConfirmSubscription = () => {
    if (selectedPlan) {
        setCurrentPlan(selectedPlan);
        setIsModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-adaptive-white sm:text-5xl">
                    Find the perfect plan
                </h1>
                <p className="mt-4 text-xl text-gray-400">
                    Start for free, then upgrade to a plan that fits your needs as a producer.
                </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {plans.map((plan) => (
                    <PricingCard
                        key={plan.id}
                        plan={plan}
                        isCurrent={currentPlan?.id === plan.id}
                        onSelect={() => handleSelectPlan(plan)}
                        formatCurrency={formatCurrency}
                    />
                ))}
            </div>
      </div>

      {selectedPlan && (
        <SubscriptionPaymentModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onConfirm={handleConfirmSubscription}
            plan={selectedPlan}
            formatCurrency={formatCurrency}
        />
      )}
    </>
  );
};