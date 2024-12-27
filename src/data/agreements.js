export const agreementsData = [
  {
    id: 1,
    clientName: 'John Smith',
    agreementType: 'Investment Management Agreement',
    status: 'Current',
    lastUpdated: '2024-12-26',
    nextReview: '2025-06-26',
    documentUrl: '#',
    version: '1.0',
    details: {
      aum: 1500000,
      feeSchedule: 'Standard',
      services: ['Portfolio Management', 'Financial Planning'],
      signedDate: '2024-01-15'
    }
  },
  {
    id: 2,
    clientName: 'Sarah Johnson',
    agreementType: 'Financial Planning Agreement',
    status: 'Review Needed',
    lastUpdated: '2024-12-25',
    nextReview: '2025-01-25',
    documentUrl: '#',
    version: '2.1',
    details: {
      aum: 750000,
      feeSchedule: 'Premium',
      services: ['Comprehensive Planning', 'Tax Planning'],
      signedDate: '2024-02-20'
    }
  },
  {
    id: 3,
    clientName: 'Michael Brown',
    agreementType: 'Investment Management Agreement',
    status: 'Pending',
    lastUpdated: '2024-12-24',
    nextReview: '2025-03-24',
    documentUrl: '#',
    version: '1.0',
    details: {
      aum: 2000000,
      feeSchedule: 'Custom',
      services: ['Portfolio Management'],
      signedDate: null
    }
  }
];