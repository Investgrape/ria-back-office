import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

const InfoTooltip = ({ text }) => (
  <div className="group relative inline-block ml-1">
    <span className="material-icons-outlined text-gray-400 text-sm cursor-help">help_outline</span>
    <div className="hidden group-hover:block absolute z-10 w-64 p-2 mt-2 text-sm text-white bg-gray-800 rounded-lg shadow-lg">
      {text}
    </div>
  </div>
);

const NewAgreementForm = ({ isOpen, onClose, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Client Information
    clientName: '',
    clientEmail: '',
    
    // Account Type
    isDiscretionary: false,
    
    // Financial Profile
    netWorthRange: '',
    liquidNetWorth: '',
    annualIncome: '',
    taxBracket: '',
    
    // Fee Structure
    feeAmount: '',
    
    // Investment Profile
    investmentObjectives: [],
    timeHorizon: '',
    riskTolerance: '',
    investmentExperience: '',
    
    // Additional Suitability
    liquidityNeeds: '',
    investmentConstraints: [],
    outsideAssets: '',
    dependents: '',
    employmentStatus: '',
    
    // Special Instructions
    marginTrading: false,
    optionsTrading: false,
    hasOutsideAccounts: false,
    outsideAccountsDetails: '',
  });

  const netWorthRanges = [
    { value: '0-250k', label: '$0 - $250,000' },
    { value: '250k-500k', label: '$250,000 - $500,000' },
    { value: '500k-1m', label: '$500,000 - $1,000,000' },
    { value: '1m-5m', label: '$1,000,000 - $5,000,000' },
    { value: '5m+', label: '$5,000,000+' }
  ];

  const investmentObjectives = [
    { value: 'capital-preservation', label: 'Capital Preservation', 
      description: 'Focus on preserving capital while generating consistent income' },
    { value: 'income', label: 'Income', 
      description: 'Generate regular income with moderate capital appreciation' },
    { value: 'growth', label: 'Growth', 
      description: 'Focus on long-term capital appreciation' },
    { value: 'aggressive-growth', label: 'Aggressive Growth',
      description: 'Maximize capital appreciation with higher risk tolerance' }
  ];

  const timeHorizons = [
    { value: 'less-than-1-year', label: 'Less than 1 year' },
    { value: '1-3-years', label: '1-3 years' },
    { value: '3-5-years', label: '3-5 years' },
    { value: '5-10-years', label: '5-10 years' },
    { value: '10-plus-years', label: '10+ years' }
  ];

  const riskTolerances = [
    { value: 'conservative', label: 'Conservative',
      description: 'Minimize risk and protect principal' },
    { value: 'moderately-conservative', label: 'Moderately Conservative',
      description: 'Some risk for modest returns' },
    { value: 'moderate', label: 'Moderate',
      description: 'Balance between risk and return' },
    { value: 'moderately-aggressive', label: 'Moderately Aggressive',
      description: 'Accept higher risk for better returns' },
    { value: 'aggressive', label: 'Aggressive',
      description: 'Maximum risk for highest potential returns' }
  ];

  const validateStep = (step) => {
    switch (step) {
      case 1: // Client Information
        return formData.clientName && formData.clientEmail && formData.netWorthRange;
      case 2: // Investment Profile
        return formData.investmentObjectives.length > 0 && formData.timeHorizon && formData.riskTolerance;
      case 3: // Fee Structure
        return formData.feeAmount;
      default:
        return true;
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      onSubmit(formData);
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Client Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Client Name *
                </label>
                <Input
                  required
                  value={formData.clientName}
                  onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  Client Email *
                </label>
                <Input
                  required
                  type="email"
                  value={formData.clientEmail}
                  onChange={(e) => setFormData({...formData, clientEmail: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Net Worth Range *
                <InfoTooltip text="Total value of all assets minus liabilities" />
              </label>
              <select
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                value={formData.netWorthRange}
                onChange={(e) => setFormData({...formData, netWorthRange: e.target.value})}
              >
                <option value="">Select net worth range</option>
                {netWorthRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Annual Income
              </label>
              <Input
                type="text"
                placeholder="e.g. $100,000"
                value={formData.annualIncome}
                onChange={(e) => setFormData({...formData, annualIncome: e.target.value})}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Investment Profile</h3>

            <div>
              <label className="block text-sm font-medium mb-1">
                Investment Objectives *
                <InfoTooltip text="Select all that apply to this client's investment goals" />
              </label>
              <div className="space-y-2">
                {investmentObjectives.map((objective) => (
                  <div key={objective.value} className="flex items-start space-x-2">
                    <Checkbox
                      checked={formData.investmentObjectives.includes(objective.value)}
                      onCheckedChange={(checked) => {
                        const newObjectives = checked 
                          ? [...formData.investmentObjectives, objective.value]
                          : formData.investmentObjectives.filter(o => o !== objective.value);
                        setFormData({...formData, investmentObjectives: newObjectives});
                      }}
                    />
                    <div>
                      <label className="text-sm font-medium">{objective.label}</label>
                      <p className="text-xs text-gray-500">{objective.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Risk Tolerance *
                <InfoTooltip text="Client's overall attitude toward investment risk" />
              </label>
              <select
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                value={formData.riskTolerance}
                onChange={(e) => setFormData({...formData, riskTolerance: e.target.value})}
              >
                <option value="">Select risk tolerance</option>
                {riskTolerances.map((risk) => (
                  <option key={risk.value} value={risk.value}>
                    {risk.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Time Horizon *
                <InfoTooltip text="Expected length of time until major withdrawals are needed" />
              </label>
              <select
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                value={formData.timeHorizon}
                onChange={(e) => setFormData({...formData, timeHorizon: e.target.value})}
              >
                <option value="">Select time horizon</option>
                {timeHorizons.map((horizon) => (
                  <option key={horizon.value} value={horizon.value}>
                    {horizon.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Account Settings</h3>

            <div>
              <label className="block text-sm font-medium mb-1">
                Advisory Fee (%) *
                <InfoTooltip text="Annual fee as a percentage of assets under management" />
              </label>
              <Input
                required
                type="number"
                step="0.01"
                min="0"
                max="3"
                value={formData.feeAmount}
                onChange={(e) => setFormData({...formData, feeAmount: e.target.value})}
                className="w-32"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={formData.isDiscretionary}
                  onCheckedChange={(checked) => setFormData({...formData, isDiscretionary: checked})}
                />
                <div>
                  <label className="text-sm font-medium">Discretionary Account</label>
                  <p className="text-xs text-gray-500">Authorization to make investment decisions without prior client approval</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={formData.marginTrading}
                  onCheckedChange={(checked) => setFormData({...formData, marginTrading: checked})}
                />
                <div>
                  <label className="text-sm font-medium">Margin Trading</label>
                  <p className="text-xs text-gray-500">Allow trading on margin (borrowing against securities)</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={formData.optionsTrading}
                  onCheckedChange={(checked) => setFormData({...formData, optionsTrading: checked})}
                />
                <div>
                  <label className="text-sm font-medium">Options Trading</label>
                  <p className="text-xs text-gray-500">Allow trading in options contracts</p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>New Investment Advisory Agreement</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {renderStep()}

          <div className="flex justify-between pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={currentStep === 1 ? onClose : handlePreviousStep}
            >
              {currentStep === 1 ? 'Cancel' : 'Back'}
            </Button>
            
            <Button
              type="button"
              onClick={currentStep === 3 ? handleSubmit : handleNextStep}
            >
              {currentStep === 3 ? 'Generate Agreement' : 'Continue'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewAgreementForm;