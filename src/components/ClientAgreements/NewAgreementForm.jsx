import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

const NewAgreementForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    netWorthRange: '',
    feeAmount: '',
    isDiscretionary: false,
    investmentObjectives: [],
    riskTolerance: '',
    timeHorizon: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>New Investment Advisory Agreement</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Client Name *</label>
              <Input
                required
                value={formData.clientName}
                onChange={(e) => setFormData({...formData, clientName: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Client Email *</label>
              <Input
                required
                type="email"
                value={formData.clientEmail}
                onChange={(e) => setFormData({...formData, clientEmail: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Net Worth Range *</label>
            <select
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              value={formData.netWorthRange}
              onChange={(e) => setFormData({...formData, netWorthRange: e.target.value})}
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
            <label className="block text-sm font-medium mb-1">Advisory Fee (%) *</label>
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

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={formData.isDiscretionary}
                onCheckedChange={(checked) => setFormData({...formData, isDiscretionary: checked})}
              />
              <label className="text-sm font-medium">Discretionary Account</label>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Create Agreement
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewAgreementForm;
