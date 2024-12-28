import React from 'react';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import type { AuditResult, AuditFinding } from '@/services/auditService';

interface AuditResultsProps {
  result: AuditResult;
  onClose: () => void;
}

export function AuditResults({ result, onClose }: AuditResultsProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Audit Results</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto">
          {/* Summary Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Total Agreements</div>
              <div className="text-2xl font-semibold">{result.summary.total}</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-green-600 mb-1">Compliant</div>
              <div className="text-2xl font-semibold text-green-700">{result.summary.compliant}</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-sm text-yellow-600 mb-1">Warnings</div>
              <div className="text-2xl font-semibold text-yellow-700">{result.summary.warnings}</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-sm text-red-600 mb-1">Violations</div>
              <div className="text-2xl font-semibold text-red-700">{result.summary.violations}</div>
            </div>
          </div>

          {/* Findings Table */}
          <div className="bg-white rounded-lg border">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Severity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Issue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recommendation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {result.findings.map((finding) => (
                  <tr key={finding.id}>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${finding.severity === 'high' ? 'bg-red-100 text-red-800' : ''}
                        ${finding.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${finding.severity === 'low' ? 'bg-blue-100 text-blue-800' : ''}
                      `}>
                        {finding.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4">{finding.clientName}</td>
                    <td className="px-6 py-4">{finding.description}</td>
                    <td className="px-6 py-4">{finding.recommendation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-6 border-t bg-gray-50">
          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Close
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Export Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}