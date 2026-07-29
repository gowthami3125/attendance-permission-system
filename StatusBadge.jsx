import { STATUS } from '../utils/constants.js';

const CONFIG = {
  [STATUS.PENDING]: { label: 'Pending', className: 'badge badge-pending' },
  [STATUS.APPROVED]: { label: 'Approved', className: 'badge badge-approved' },
  [STATUS.REJECTED]: { label: 'Rejected', className: 'badge badge-rejected' },
};

export default function StatusBadge({ status }) {
  const config = CONFIG[status] || CONFIG[STATUS.PENDING];
  return <span className={config.className}>{config.label}</span>;
}
