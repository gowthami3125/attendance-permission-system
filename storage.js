import { STORAGE_KEY } from './constants.js';

const seedData = [
  {
    id: 'REQ-SEED-001',
    studentId: 'STU2023045',
    studentName: 'Aditi Sharma',
    category: 'medical',
    fromDate: '2026-07-20',
    toDate: '2026-07-22',
    reason: 'Diagnosed with viral fever, advised bed rest by doctor. Attaching medical certificate.',
    attachmentName: 'medical_certificate.pdf',
    status: 'approved',
    createdAt: '2026-07-19T09:15:00.000Z',
    updatedAt: '2026-07-19T14:40:00.000Z',
    facultyRemarks: 'Approved. Get well soon.',
    history: [
      { status: 'pending', by: 'Aditi Sharma', at: '2026-07-19T09:15:00.000Z', remarks: 'Request submitted' },
      { status: 'approved', by: 'Dr. Rajeev Menon', at: '2026-07-19T14:40:00.000Z', remarks: 'Approved. Get well soon.' },
    ],
  },
  {
    id: 'REQ-SEED-002',
    studentId: 'STU2023045',
    studentName: 'Aditi Sharma',
    category: 'internship',
    fromDate: '2026-08-01',
    toDate: '2026-08-15',
    reason: 'Selected for a two-week internship at TCS as part of the placement program.',
    attachmentName: 'internship_offer_letter.pdf',
    status: 'pending',
    createdAt: '2026-07-25T11:00:00.000Z',
    updatedAt: '2026-07-25T11:00:00.000Z',
    facultyRemarks: '',
    history: [
      { status: 'pending', by: 'Aditi Sharma', at: '2026-07-25T11:00:00.000Z', remarks: 'Request submitted' },
    ],
  },
  {
    id: 'REQ-SEED-003',
    studentId: 'STU2023102',
    studentName: 'Rohan Verma',
    category: 'official-event',
    fromDate: '2026-07-18',
    toDate: '2026-07-19',
    reason: 'Representing college at the Inter-University Robotics Championship.',
    attachmentName: 'event_invitation.pdf',
    status: 'rejected',
    createdAt: '2026-07-16T08:30:00.000Z',
    updatedAt: '2026-07-16T16:00:00.000Z',
    facultyRemarks: 'Insufficient supporting documents. Please resubmit with the official participation letter.',
    history: [
      { status: 'pending', by: 'Rohan Verma', at: '2026-07-16T08:30:00.000Z', remarks: 'Request submitted' },
      {
        status: 'rejected',
        by: 'Dr. Rajeev Menon',
        at: '2026-07-16T16:00:00.000Z',
        remarks: 'Insufficient supporting documents. Please resubmit with the official participation letter.',
      },
    ],
  },
];

export function getRequests() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveRequests(requests) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
}

export function addRequest(request) {
  const requests = getRequests();
  const updated = [request, ...requests];
  saveRequests(updated);
  return updated;
}

export function updateRequest(id, updater) {
  const requests = getRequests();
  const updated = requests.map((r) => (r.id === id ? updater(r) : r));
  saveRequests(updated);
  return updated;
}
