export interface ComplianceRule {
  id: string;
  name: string;
  description: string;
  category: 'agreements' | 'disclosures' | 'registration' | 'cybersecurity' | 'trading' | 'billing';
  severity: 'high' | 'medium' | 'low';
  checkFunction: (data: any) => Promise<RuleResult>;
}

export interface RuleResult {
  passed: boolean;
  findings: string[];
  details?: any;
}

export const complianceRules: ComplianceRule[] = [
  {
    id: 'AGR001',
    name: 'Investment Management Agreement Expiration',
    description: 'Checks for agreements that are expired or approaching expiration',
    category: 'agreements',
    severity: 'high',
    checkFunction: async (agreement) => {
      const expirationDate = new Date(agreement.expirationDate);
      const today = new Date();
      const daysUntilExpiration = Math.floor((expirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysUntilExpiration < 0) {
        return {
          passed: false,
          findings: ['Agreement has expired']
        };
      }
      
      if (daysUntilExpiration < 30) {
        return {
          passed: false,
          findings: [`Agreement expires in ${daysUntilExpiration} days`]
        };
      }
      
      return { passed: true, findings: [] };
    }
  },
  {
    id: 'AGR002',
    name: 'Required Agreement Clauses',
    description: 'Verifies that all required clauses are present in agreements',
    category: 'agreements',
    severity: 'high',
    checkFunction: async (agreement) => {
      const requiredClauses = [
        'fiduciary duty',
        'fee schedule',
        'termination provisions',
        'privacy policy'
      ];
      
      const missingClauses = requiredClauses.filter(clause => 
        !agreement.content?.toLowerCase().includes(clause)
      );
      
      return {
        passed: missingClauses.length === 0,
        findings: missingClauses.map(clause => `Missing required clause: ${clause}`)
      };
    }
  },
  {
    id: 'AGR003',
    name: 'Signature Verification',
    description: 'Checks for presence of all required signatures',
    category: 'agreements',
    severity: 'high',
    checkFunction: async (agreement) => {
      const findings = [];
      
      if (!agreement.clientSignature) {
        findings.push('Missing client signature');
      }
      
      if (!agreement.advisorSignature) {
        findings.push('Missing advisor signature');
      }
      
      if (agreement.type === 'discretionary' && !agreement.custodianSignature) {
        findings.push('Missing custodian signature for discretionary agreement');
      }
      
      return {
        passed: findings.length === 0,
        findings
      };
    }
  }
];