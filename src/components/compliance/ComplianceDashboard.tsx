import React from 'react';
import { AlertTriangle, Shield, Activity } from 'lucide-react';
import type { RiskScore } from '@/services/rules/riskAssessment';

interface ComplianceDashboardProps {
  riskScore: RiskScore;
}

export function ComplianceDashboard({ riskScore }: ComplianceDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Risk Score Overview */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Risk Assessment</h2>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-gray-900">{riskScore.overall}</div>
            <div className="text-sm text-gray-500">Overall Risk Score</div>
          </div>
          <div className="flex gap-8">
            {Object.entries(riskScore.categories).map(([category, score]) => (
              <div key={category} className="text-center">
                <div className="text-2xl font-semibold">{score}</div>
                <div className="text-sm text-gray-500 capitalize">{category}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Risk Findings */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Risk Findings</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {riskScore.findings.map((finding, index) => (
            <div key={index} className="p-6">
              <div className="flex items-start">
                <div className={`rounded-full p-2 mr-4 ${{
                  high: 'bg-red-100 text-red-600',
                  medium: 'bg-yellow-100 text-yellow-600',
                  low: 'bg-blue-100 text-blue-600'
                }[finding.level]}`}>
                  <AlertTriangle size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">{finding.category}</h3>
                    <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                      {
                        high: 'bg-red-100 text-red-800',
                        medium: 'bg-yellow-100 text-yellow-800',
                        low: 'bg-blue-100 text-blue-800'
                      }[finding.level]
                    }`}>
                      {finding.level} risk
                    </span>
                  </div>
                  <p className="mt-1 text-gray-600">{finding.description}</p>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900">Recommendation</h4>
                    <p className="mt-1 text-sm text-gray-600">{finding.recommendation}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-6">
        <button className="p-6 bg-white rounded-lg shadow text-left hover:shadow-md transition-shadow">
          <Shield className="w-8 h-8 text-emerald-600 mb-4" />
          <h3 className="font-medium">Review Security Settings</h3>
          <p className="text-sm text-gray-600 mt-1">Check and update security configurations</p>
        </button>
        <button className="p-6 bg-white rounded-lg shadow text-left hover:shadow-md transition-shadow">
          <Activity className="w-8 h-8 text-blue-600 mb-4" />
          <h3 className="font-medium">Generate Compliance Report</h3>
          <p className="text-sm text-gray-600 mt-1">Create detailed compliance documentation</p>
        </button>
        <button className="p-6 bg-white rounded-lg shadow text-left hover:shadow-md transition-shadow">
          <AlertTriangle className="w-8 h-8 text-yellow-600 mb-4" />
          <h3 className="font-medium">Schedule Risk Review</h3>
          <p className="text-sm text-gray-600 mt-1">Plan next comprehensive risk assessment</p>
        </button>
      </div>
    </div>
  );
}