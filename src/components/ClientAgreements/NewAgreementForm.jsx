import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

// Step indicator component
const StepIndicator = ({ currentStep, totalSteps }) => (
  <div className="flex justify-between items-center w-full mb-6">
    {Array.from({ length: totalSteps }, (_, idx) => idx + 1).map((step) => (
      <div key={step} className="flex items-center flex-1 last:flex-initial">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${step === currentStep
            ? 'bg-emerald-600 text-white'
            : step < currentStep
            ? 'bg-emerald-100 text-emerald-600'
            : 'bg-gray-100 text-gray-400'
          }`}
        >
          {step}
        </div>
        {step !== totalSteps && (
          <div className={`h-0.5 w-full mx-2 ${step < currentStep ? 'bg-emerald-100' : 'bg-gray-100'}`} />
        )}
      </div>
    ))}
  </div>
);

const stepTitles = [
  'Client Information',
  'Financial Profile',
  'Investment Objectives',
  'Account Settings'
];

const NewAgreementForm = ({ isOpen, onClose, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    netWorthRange: '',
    liquidNetWorth: '',
    investmentObjectives: [],
    riskTolerance: '',
    timeHorizon: '',
    feeAmount: '',
    isDiscretionary: false,
    marginTrading: false,
    optionsTrading: false,
  });

  const handlePrevStep = () => {
    setCurrentStep(Math.max(1, currentStep - 1));
  };

  const handleNextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(Math.min(4, currentStep + 1));
    }
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1: // Client Information
        return formData.clientName && formData.clientEmail;
      case 2: // Financial Profile
        return formData.netWorthRange;
      case 3: // Investment Objectives
        return formData.investmentObjectives.length > 0 && formData.riskTolerance && formData.timeHorizon;
      case 4: // Account Settings
        return formData.feeAmount;
      default:
        return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateCurrentStep()) {
      onSubmit(formData);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{stepTitles[currentStep - 1]}</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <StepIndicator currentStep={currentStep} totalSteps={4} />

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Current step content will be rendered here */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Client Name *</label>
                  <Input
                    required
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Client Email *</label>
                  <Input
                    required
                    type="email"
                    value={formData.clientEmail}
                    onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Net Worth Range *</label>
                  <select
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                    value={formData.netWorthRange}
                    onChange={(e) => setFormData({ ...formData, netWorthRange: e.target.value })}
                  >
                    <option value="">Select net worth range</option>
                    <option value="0-250k">$0 - $250,000</option>
                    <option value="250k-500k">$250,000 - $500,000</option>
                    <option value="500k-1m">$500,000 - $1,000,000</option>
                    <option value="1m-5m">$1,000,000 - $5,000,000</option>
                    <option value="5m+">$5,000,000+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Liquid Net Worth</label>
                  <Input
                    type="text"
                    placeholder="e.g. $500,000"
                    value={formData.liquidNetWorth}
                    onChange={(e) => setFormData({ ...formData, liquidNetWorth: e.target.value })}
                  />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Investment Objectives *</label>
                  <div className="space-y-2">
                    {[
                      { value: 'preservation', label: 'Capital Preservation' },
                      { value: 'income', label: 'Income Generation' },
                      { value: 'growth', label: 'Growth' },
                      { value: 'aggressive', label: 'Aggressive Growth' }
                    ].map((objective) => (
                      <div key={objective.value} className="flex items-center space-x-2">
                        <Checkbox
                          checked={formData.investmentObjectives.includes(objective.value)}
                          onCheckedChange={(checked) => {
                            const newObjectives = checked
                              ? [...formData.investmentObjectives, objective.value]
                              : formData.investmentObjectives.filter((o) => o !== objective.value);
                            setFormData({ ...formData, investmentObjectives: newObjectives });
                          }}
                        />
                        <label className="text-sm">{objective.label}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Risk Tolerance *</label>
                  <select
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                    value={formData.riskTolerance}
                    onChange={(e) => setFormData({ ...formData, riskTolerance: e.target.value })}
                  >
                    <option value="">Select risk tolerance</option>
                    <option value="conservative">Conservative</option>
                    <option value="moderate">Moderate</option>
                    <option value="aggressive">Aggressive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Time Horizon *</label>
                  <select
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                    value={formData.timeHorizon}
                    onChange={(e) => setFormData({ ...formData, timeHorizon: e.target.value })}
                  >
                    <option value="">Select time horizon</option>
                    <option value="short">Short Term (< 3 years)</option>
                    <option value="medium">Medium Term (3-7 years)</option>
                    <option value="long">Long Term (7+ years)</option>
                  </select>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Advisory Fee (%) *</label>
                  <Input
                    required
                    type="number"
                    step="0.01"
                    min="0"
                    max="3"
                    value={formData.feeAmount}
                    onChange={(e) => setFormData({ ...formData, feeAmount: e.target.value })}
                    className="w-32"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={formData.isDiscretionary}
                      onCheckedChange={(checked) => setFormData({ ...formData, isDiscretionary: checked })}
                    />
                    <label className="text-sm">Discretionary Account</label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={formData.marginTrading}
                      onCheckedChange={(checked) => setFormData({ ...formData, marginTrading: checked })}
                    />
                    <label className="text-sm">Allow Margin Trading</label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={formData.optionsTrading}
                      onCheckedChange={(checked) => setFormData({ ...formData, optionsTrading: checked })}
                    />
                    <label className="text-sm">Allow Options Trading</label>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={currentStep === 1 ? onClose : handlePrevStep}
              >
                {currentStep === 1 ? 'Cancel' : 'Previous'}
              </Button>
              
              <Button
                type={currentStep === 4 ? 'submit' : 'button'}
                onClick={currentStep === 4 ? undefined : handleNextStep}
              >
                {currentStep === 4 ? 'Create Agreement' : 'Next'}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewAgreementForm;