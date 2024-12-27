import React, { useState } from 'react';

const ClientSignature = ({ client, agreement, onSignComplete }) => {
  const [step, setStep] = useState(1);
  const [signatureData, setSignatureData] = useState({
    acknowledgeAgreement: false,
    acknowledgePrivacy: false,
    acknowledgeADV: false,
    signature: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleChange = (field, value) => {
    setSignatureData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = () => {
    switch (step) {
      case 1: // Agreement Review
        return signatureData.acknowledgeAgreement;
      case 2: // Privacy Policy & ADV
        return signatureData.acknowledgePrivacy && signatureData.acknowledgeADV;
      case 3: // Signature
        return signatureData.signature.trim().length > 0;
      default:
        return false;
    }
  };

  const handleSubmit = () => {
    onSignComplete(signatureData);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* Progress Steps */}
      <div className="flex justify-between items-center mb-8">
        {['Review Agreement', 'Review Disclosures', 'Sign'].map((label, idx) => (
          <div key={idx} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
              step > idx + 1 ? 'bg-emerald-500 border-emerald-500 text-white' :
              step === idx + 1 ? 'border-emerald-500 text-emerald-500' :
              'border-gray-300 text-gray-300'
            }`}>
              {step > idx + 1 ? (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              ) : (
                idx + 1
              )}
            </div>
            {idx < 2 && (
              <div className={`w-24 h-0.5 ${step > idx + 1 ? 'bg-emerald-500' : 'bg-gray-300'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4">Investment Management Agreement Review</h2>
            <div className="prose max-w-none mb-6">
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Agreement Summary</h3>
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm text-gray-500">Management Fee</dt>
                    <dd className="text-sm font-medium text-gray-900">{agreement.feeSchedule}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Account Type</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {agreement.discretionary ? 'Discretionary' : 'Non-Discretionary'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Investment Objectives</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {agreement.investmentObjectives.join(', ')}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Risk Tolerance</dt>
                    <dd className="text-sm font-medium text-gray-900">{agreement.riskTolerance}</dd>
                  </div>
                </dl>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <label className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    checked={signatureData.acknowledgeAgreement}
                    onChange={(e) => handleChange('acknowledgeAgreement', e.target.checked)}
                    className="mt-1 h-4 w-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                  />
                  <span className="text-sm text-gray-700">
                    I acknowledge that I have read and understand the Investment Management Agreement, 
                    including all terms, conditions, and fee schedules. I understand that by 
                    electronically signing this agreement, I am entering into a binding contract.
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4">Review Required Disclosures</h2>
            
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Privacy Policy</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Our privacy policy details how we collect, use, and protect your personal information.
                </p>
                <label className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    checked={signatureData.acknowledgePrivacy}
                    onChange={(e) => handleChange('acknowledgePrivacy', e.target.checked)}
                    className="mt-1 h-4 w-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                  />
                  <span className="text-sm text-gray-700">
                    I acknowledge that I have received and reviewed the Privacy Policy.
                  </span>
                </label>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Form ADV Part 2A</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Form ADV Part 2A contains important information about our firm, services, fees, 
                  and potential conflicts of interest.
                </p>
                <label className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    checked={signatureData.acknowledgeADV}
                    onChange={(e) => handleChange('acknowledgeADV', e.target.checked)}
                    className="mt-1 h-4 w-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                  />
                  <span className="text-sm text-gray-700">
                    I acknowledge that I have received and reviewed Form ADV Part 2A (Firm Brochure).
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4">Electronic Signature</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Please type your full legal name to sign
                </label>
                <input
                  type="text"
                  value={signatureData.signature}
                  onChange={(e) => handleChange('signature', e.target.value)}
                  placeholder="Your full legal name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={signatureData.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  By typing your name above and clicking "Sign Agreement", you are:
                </p>
                <ul className="mt-2 text-sm text-gray-600 list-disc list-inside space-y-1">
                  <li>Confirming all information provided is accurate and complete</li>
                  <li>Agreeing to the terms of the Investment Management Agreement</li>
                  <li>Acknowledging receipt of the Privacy Policy and Form ADV Part 2A</li>
                  <li>Consenting to electronic delivery of documents</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t border-gray-200">
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            Back
          </button>
        )}
        <div className="flex gap-4">
          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!validateStep()}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!validateStep()}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sign Agreement
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientSignature;