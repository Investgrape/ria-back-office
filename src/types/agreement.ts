export interface Agreement {
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

export interface ComplianceAlert {
  id: string;
  clientName: string;
  issues: string[];
  severity: 'warning' | 'error' | 'info';
}

export interface AgreementFormData {
  clientName: string;
  email: string;
  accountType: string;
  fee: string;
  isRollover: boolean;
  riskScore?: string;
}