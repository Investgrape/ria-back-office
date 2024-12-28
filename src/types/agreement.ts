export interface Agreement {
  id: string;
  clientName: string;
  type: AgreementType;
  status: AgreementStatus;
  dateCreated: string;
  lastModified: string;
  version: string;
  content?: string;
  signedDate?: string;
  expirationDate?: string;
  attachments?: Attachment[];
}

export type AgreementStatus = 'draft' | 'pending' | 'active' | 'expired' | 'terminated';

export type AgreementType = 
  | 'Investment Management Agreement'
  | 'Financial Planning Agreement'
  | 'Custodial Agreement'
  | 'Limited Power of Attorney'
  | 'Privacy Policy'
  | 'Form ADV Receipt'
  | 'Risk Disclosure';

export interface Attachment {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
}

export interface AgreementTemplate {
  id: string;
  name: string;
  type: AgreementType;
  content: string;
  version: string;
  lastUpdated: string;
  variables: string[];
  requiredFields: string[];
}