export interface AuditResult {
  id: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error';
  findings: AuditFinding[];
  summary: {
    total: number;
    compliant: number;
    warnings: number;
    violations: number;
  };
}

export interface AuditFinding {
  id: string;
  agreementId: string;
  clientName: string;
  severity: 'high' | 'medium' | 'low';
  type: string;
  description: string;
  recommendation: string;
}

export async function runAudit(): Promise<AuditResult> {
  // Simulate API call to run audit
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: '1',
        timestamp: new Date().toISOString(),
        status: 'warning',
        findings: [
          {
            id: '1',
            agreementId: '1',
            clientName: 'John Doe',
            severity: 'medium',
            type: 'Missing Signature',
            description: 'Investment Management Agreement requires client signature',
            recommendation: 'Follow up with client to obtain signature'
          },
          {
            id: '2',
            agreementId: '2',
            clientName: 'Jane Smith',
            severity: 'high',
            type: 'Expired Agreement',
            description: 'Agreement expired on 2024-01-01',
            recommendation: 'Renew agreement with client'
          }
        ],
        summary: {
          total: 24,
          compliant: 20,
          warnings: 2,
          violations: 2
        }
      });
    }, 2000);
  });
}