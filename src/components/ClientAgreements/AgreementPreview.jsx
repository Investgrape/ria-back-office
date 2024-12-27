import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const AgreementPreview = ({ isOpen, onClose, agreementData, onSubmit }) => {
  const formatMoney = (value) => {
    if (!value) return '';
    return value.startsWith('$') ? value : `$${value}`;
  };

  const formatNetWorth = (range) => {
    const ranges = {
      '0-250k': '$0 - $250,000',
      '250k-500k': '$250,000 - $500,000',
      '500k-1m': '$500,000 - $1,000,000',
      '1m-5m': '$1,000,000 - $5,000,000',
      '5m+': '$5,000,000+'
    };
    return ranges[range] || range;
  };

  const formatObjectives = (objectives) => {
    const labels = {
      'preservation': 'Capital Preservation',
      'income': 'Income Generation',
      'growth': 'Growth',
      'aggressive': 'Aggressive Growth'
    };
    return objectives.map(obj => labels[obj] || obj).join(', ');
  };

  const formatRiskTolerance = (risk) => {
    return risk.charAt(0).toUpperCase() + risk.slice(1).replace(/-/g, ' ');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Investment Advisory Agreement Preview</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Agreement Header */}
          <div className="text-center border-b pb-4">
            <h2 className="text-2xl font-semibold">INVESTMENT ADVISORY AGREEMENT</h2>
            <p className="text-gray-500 mt-2">{new Date().toLocaleDateString()}</p>
          </div>

          {/* Agreement Sections */}
          <div className="space-y-6">
            {/* Parties */}
            <section>
              <h3 className="text-lg font-semibold mb-2">1. Parties</h3>
              <p>This Investment Advisory Agreement ("Agreement") is entered into between:</p>
              <div className="mt-2 space-y-2">
                <p><strong>Investment Adviser:</strong> [Firm Name]<br />
                A registered investment adviser</p>
                <p><strong>Client:</strong> {agreementData.clientName}<br />
                {agreementData.clientEmail}</p>
              </div>
            </section>

            {/* Services */}
            <section>
              <h3 className="text-lg font-semibold mb-2">2. Services</h3>
              <p>The Client hereby appoints the Adviser to manage the Client's investment account(s) on a 
                {agreementData.isDiscretionary ? " discretionary" : "n non-discretionary"} basis.</p>
              {agreementData.isDiscretionary && (
                <p className="mt-2 text-sm bg-gray-50 p-3 rounded">
                  Under this discretionary authority, the Adviser may buy, sell, or otherwise trade securities 
                  or other investments in the Account without discussing investment decisions with the Client 
                  in advance.
                </p>
              )}
            </section>

            {/* Client Profile */}
            <section>
              <h3 className="text-lg font-semibold mb-2">3. Client Profile</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Net Worth Range:</strong><br />
                  {formatNetWorth(agreementData.netWorthRange)}</p>
                </div>
                {agreementData.liquidNetWorth && (
                  <div>
                    <p><strong>Liquid Net Worth:</strong><br />
                    {formatMoney(agreementData.liquidNetWorth)}</p>
                  </div>
                )}
                {agreementData.annualIncome && (
                  <div>
                    <p><strong>Annual Income:</strong><br />
                    {formatMoney(agreementData.annualIncome)}</p>
                  </div>
                )}
                <div>
                  <p><strong>Investment Objectives:</strong><br />
                  {formatObjectives(agreementData.investmentObjectives)}</p>
                </div>
                <div>
                  <p><strong>Risk Tolerance:</strong><br />
                  {formatRiskTolerance(agreementData.riskTolerance)}</p>
                </div>
                {agreementData.timeHorizon && (
                  <div>
                    <p><strong>Time Horizon:</strong><br />
                    {agreementData.timeHorizon}</p>
                  </div>
                )}
              </div>
            </section>

            {/* Fees */}
            <section>
              <h3 className="text-lg font-semibold mb-2">4. Advisory Fees</h3>
              <p>The Client agrees to pay an annual advisory fee of {agreementData.feeAmount}% of the assets 
              under management. This fee will be calculated and charged quarterly in advance based on the 
              account value at the beginning of each quarter.</p>
            </section>

            {/* Trading Authorization */}
            <section>
              <h3 className="text-lg font-semibold mb-2">5. Trading Authorization</h3>
              <div className="space-y-2">
                {agreementData.marginTrading && (
                  <p>✓ Client authorizes margin trading in the account</p>
                )}
                {agreementData.optionsTrading && (
                  <p>✓ Client authorizes options trading in the account</p>
                )}
                {!agreementData.marginTrading && !agreementData.optionsTrading && (
                  <p>No special trading authorizations requested.</p>
                )}
              </div>
            </section>

            {/* Risk Disclosures */}
            <section>
              <h3 className="text-lg font-semibold mb-2">6. Risk Disclosures</h3>
              <div className="bg-gray-50 p-4 rounded text-sm space-y-2">
                <p>Client acknowledges and understands that:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Past performance does not guarantee future results</li>
                  <li>Investing in securities involves risk of loss that clients should be prepared to bear</li>
                  <li>Investment objectives may not be achieved</li>
                  {agreementData.marginTrading && (
                    <li>Margin trading involves a high degree of risk and may result in losses greater than 
                    the initial investment</li>
                  )}
                  {agreementData.optionsTrading && (
                    <li>Options trading carries substantial risk and is not suitable for all investors</li>
                  )}
                </ul>
              </div>
            </section>

            {/* Required Disclosures */}
            <section>
              <h3 className="text-lg font-semibold mb-2">7. Required Disclosures</h3>
              <p className="text-sm">Client acknowledges receipt of:</p>
              <ul className="list-disc pl-5 text-sm mt-2">
                <li>Form ADV Part 2A (Firm Brochure)</li>
                <li>Form ADV Part 2B (Brochure Supplement)</li>
                <li>Privacy Policy Notice</li>
              </ul>
            </section>
          </div>

          {/* Agreement Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button variant="outline" onClick={onClose}>
              Back
            </Button>
            <Button onClick={onSubmit}>
              Send for Signature
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AgreementPreview;