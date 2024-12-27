import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SignatureRequest = ({ isOpen, onClose, agreementData, onSubmit }) => {
  const [emailContent, setEmailContent] = useState({
    subject: `Investment Advisory Agreement - ${agreementData.clientName}`,
    body: `Dear ${agreementData.clientName},

Thank you for choosing [Firm Name] as your investment adviser. Please review and electronically sign your Investment Advisory Agreement.

AGREEMENT DETAILS:
• Advisory Fee: ${agreementData.feeAmount}%
• Account Type: ${agreementData.isDiscretionary ? 'Discretionary' : 'Non-Discretionary'}
${agreementData.marginTrading ? '• Margin Trading Authorized\n' : ''}${agreementData.optionsTrading ? '• Options Trading Authorized\n' : ''}

IMPORTANT DOCUMENTS:
• Investment Advisory Agreement
• Form ADV Part 2A (Firm Brochure)
• Privacy Policy Notice

Please review all documents carefully before signing. If you have any questions, don't hesitate to contact us.

Best regards,
[Adviser Name]
[Firm Name]`
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(emailContent);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Send Agreement for Signature</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email Subject</label>
            <Input
              value={emailContent.subject}
              onChange={(e) => setEmailContent({ ...emailContent, subject: e.target.value })}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email Message</label>
            <textarea
              value={emailContent.body}
              onChange={(e) => setEmailContent({ ...emailContent, body: e.target.value })}
              className="w-full h-96 px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" type="button" onClick={onClose}>
              Back
            </Button>
            <Button type="submit">
              Send for Signature
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignatureRequest;