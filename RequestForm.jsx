import { useState } from 'react';
import { CATEGORIES } from '../utils/constants.js';

const initialState = { category: 'medical', fromDate: '', toDate: '', reason: '', attachmentName: '' };

export default function RequestForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    update('attachmentName', file ? file.name : '');
  }

  function validate() {
    const errs = {};
    if (!form.fromDate) errs.fromDate = 'Start date is required';
    if (!form.toDate) errs.toDate = 'End date is required';
    if (form.fromDate && form.toDate && form.toDate < form.fromDate) {
      errs.toDate = 'End date cannot be before start date';
    }
    if (!form.reason.trim() || form.reason.trim().length < 15) {
      errs.reason = 'Please provide at least 15 characters describing the reason';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
    setForm(initialState);
  }

  return (
    <form className="request-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Category</label>
        <select value={form.category} onChange={(e) => update('category', e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>From Date</label>
          <input type="date" value={form.fromDate} onChange={(e) => update('fromDate', e.target.value)} />
          {errors.fromDate && <span className="field-error">{errors.fromDate}</span>}
        </div>
        <div className="form-group">
          <label>To Date</label>
          <input type="date" value={form.toDate} onChange={(e) => update('toDate', e.target.value)} />
          {errors.toDate && <span className="field-error">{errors.toDate}</span>}
        </div>
      </div>

      <div className="form-group">
        <label>Reason / Details</label>
        <textarea
          rows={4}
          placeholder="Describe the reason for your attendance permission request..."
          value={form.reason}
          onChange={(e) => update('reason', e.target.value)}
        />
        {errors.reason && <span className="field-error">{errors.reason}</span>}
      </div>

      <div className="form-group">
        <label>Supporting Document (optional)</label>
        <input type="file" onChange={handleFileChange} />
        {form.attachmentName && <span className="file-name">📎 {form.attachmentName}</span>}
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary">Submit Request</button>
      </div>
    </form>
  );
}
