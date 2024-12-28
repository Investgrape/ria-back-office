import { complianceRules, type RuleResult } from './rules/auditRules';
import { assessRisk, type RiskScore } from './rules/riskAssessment';

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
  riskScore: RiskScore;
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

const sampleAgreements = [
  {
    id: '1',
    clientName: 'John Doe',
    type: 'discretionary',
    content: 'This agreement includes fiduciary duty, fee schedule, but missing privacy policy...',
    expirationDate: '2024-02-01',
    clientSignature: true,
    advisorSignature: true,
    custodianSignature: false
  },
  {
    id: '2',
    clientName: 'Jane Smith',
    type: 'non-discretionary',
    content: 'Complete agreement with all clauses: fiduciary duty, fee schedule, termination provisions, privacy policy',
    expirationDate: '2025-01-15',
    clientSignature: true,
    advisorSignature: true
  }
];

export async function runAudit(): Promise<AuditResult> {
  try {
    // Run compliance rules
    const ruleResults = await Promise.all(
      sampleAgreements.map(async (agreement) => {
        const results = await Promise.all(
          complianceRules.map(async (rule) => {
            const result = await rule.checkFunction(agreement);
            return { rule, result, agreement };
          })
        );
        return results;
      })
    ).then(results => results.flat());

    // Get risk assessment
    const riskScore = await assessRisk(sampleAgreements);

    // Process findings
    const findings = ruleResults
      .filter(({ result }) => !result.result.passed)
      .map(({ rule, result, agreement }, index) => ({
        id: `finding-${index + 1}`,
        agreementId: agreement.id,
        clientName: agreement.clientName,
        severity: rule.severity,
        type: rule.name,
        description: result.result.findings.join(', '),
        recommendation: `Review and address ${rule.name.toLowerCase()}`
      }));

    // Calculate summary
    const total = sampleAgreements.length;
    const violations = findings.filter(f => f.severity === 'high').length;
    const warnings = findings.filter(f => f.severity === 'medium').length;
    const compliant = total - violations - warnings;

    return {
      id: new Date().getTime().toString(),
      timestamp: new Date().toISOString(),
      status: violations > 0 ? 'error' : warnings > 0 ? 'warning' : 'success',
      findings,
      summary: {
        total,
        compliant,
        warnings,
        violations
      },
      riskScore
    };
  } catch (error) {
    console.error('Audit failed:', error);
    throw error;
  }
}