import React, { useState, useEffect } from 'react';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogTrigger, DialogDescription 
} from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { 
  FileText, AlertTriangle, Clock, CheckCircle2, 
  XCircle, FileSignature, History, Send 
} from 'lucide-react';

interface Agreement {
  id: string;
  clientName: string;
  type: string;
  status: 'pending_review' | 'approved' | 'rejected';
  riskScore: 'low' | 'medium' | 'high';
  created: string;
  lastModified: string;
  version: string;
  fee: string;
  accountType: string;
  assets: string;
  complianceNotes: string[];
}

interface ComplianceAlert {
  id: string;
  clientName: string;
  issues: string[];
  severity: 'warning' | 'error' | 'info';
}

const AgreementManagement: React.FC = () => {
  const [agreements, setAgreements] = useState<Agreement[]>([]);
  const [showNewAgreement, setShowNewAgreement] = useState(false);
  const [selectedAgreement, setSelectedAgreement] = useState<(Agreement & { showHistory?: boolean; showSend?: boolean }) | null>(null);
  const [complianceAlerts, setComplianceAlerts] = useState<ComplianceAlert[]>([]);

  // Mock data
  const mockAgreements: Agreement[] = [
    {
      id: 'AGR-001',
      clientName: 'John Smith',
      type: 'Investment Advisory',
      status: 'pending_review',
      riskScore: 'medium',
      created: '2024-01-15',
      lastModified: '2024-01-20',
      version: '1.2',
      fee: '1.25',
      accountType: 'individual',
      assets: '500000',
      complianceNotes: ['Fee schedule needs review', 'Risk disclosure incomplete'],
    },
    {
      id: 'AGR-002',
      clientName: 'Sarah Johnson',
      type: 'Wrap Fee Program',
      status: 'approved',
      riskScore: 'low',
      created: '2024-01-10',
      lastModified: '2024-01-18',
      version: '1.0',
      fee: '1.00',
      accountType: 'ira',
      assets: '750000',
      complianceNotes: [],
    }
  ];

  useEffect(() => {
    setAgreements(mockAgreements);
    
    const alerts = mockAgreements.reduce<ComplianceAlert[]>((acc, agreement) => {
      if (agreement.complianceNotes.length > 0) {
        acc.push({
          id: agreement.id,
          clientName: agreement.clientName,
          issues: agreement.complianceNotes,
          severity: 'warning'
        });
      }
      return acc;
    }, []);
    setComplianceAlerts(alerts);
  }, []);

  const getStatusIcon = (status: Agreement['status']) => {
    switch (status) {
      case 'pending_review':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'approved':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const getRiskBadge = (score: Agreement['riskScore']) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[score]}`}>
        {score.charAt(0).toUpperCase() + score.slice(1)} Risk
      </span>
    );
  };

  const ComplianceAlerts: React.FC = () => (
    <div className="mb-6">
      {complianceAlerts.map((alert, index) => (
        <Alert key={index} variant="warning" className="mb-2">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>{alert.clientName}</strong>: {alert.issues.join(', ')}
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );

  const AgreementList: React.FC = () => (
    <Card>
      <CardContent className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Client Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Risk Score</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Version</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {agreements.map((agreement) => (
                <tr key={agreement.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{agreement.clientName}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{agreement.type}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(agreement.status)}
                      <span>{agreement.status.replace('_', ' ').charAt(0).toUpperCase() + 
                            agreement.status.slice(1).replace('_', ' ')}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{getRiskBadge(agreement.riskScore)}</td>
                  <td className="px-4 py-3 text-sm">v{agreement.version}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => setSelectedAgreement(agreement)}
                      >
                        <FileSignature className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => setSelectedAgreement({ ...agreement, showHistory: true })}
                      >
                        <History className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => setSelectedAgreement({ ...agreement, showSend: true })}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Agreement Management</h1>
          <p className="text-gray-500">Manage and monitor client agreements</p>
        </div>
        <Button onClick={() => setShowNewAgreement(true)}>
          Create New Agreement
        </Button>
      </div>

      {complianceAlerts.length > 0 && <ComplianceAlerts />}
      <AgreementList />

      {selectedAgreement && (
        <Dialog open={!!selectedAgreement} onOpenChange={() => setSelectedAgreement(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {selectedAgreement.showHistory ? 'Agreement History' :
                 selectedAgreement.showSend ? 'Send Agreement' :
                 'Agreement Details'}
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p>Client: {selectedAgreement.clientName}</p>
              <p>Type: {selectedAgreement.type}</p>
              <p>Created: {selectedAgreement.created}</p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AgreementManagement;