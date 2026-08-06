import { QrCode, Plus, Power, BarChart2 } from 'lucide-react';
import DashboardLayout from '../../layout/DashboardLayout';
import { MOCK_QR_CODES, MOCK_BUSINESSES_ADMIN } from '../../../lib/mockData';

export default function OwnerQRManagementPage() {
  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-black font-black text-2xl mb-1">QR Management</h1>
          <p className="text-sm" style={{ color: 'black' }}>Generate, assign, enable/disable and track every QR stand</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: '#2563EB' }}>
          <Plus size={15} /> Generate QR
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total QR Stands', value: MOCK_BUSINESSES_ADMIN.reduce((s, b) => s + b.qrStands, 0), color: '#3B82F6' },
          { label: 'Active', value: MOCK_QR_CODES.filter(q => q.status === 'active').length, color: '#22C55E' },
          { label: 'Total Scans', value: MOCK_QR_CODES.reduce((s, q) => s + q.scans, 0), color: '#F97316' },
        ].map(s => (
          <div key={s.label} className="glass-card p-5 rounded-2xl text-center">
            <p className="font-black text-2xl mb-1" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs" style={{ color: 'black' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider" style={{ color: '#6B7280' }}>
              <th className="px-6 py-3 font-semibold">QR Code</th>
              <th className="px-6 py-3 font-semibold">Link</th>
              <th className="px-6 py-3 font-semibold">Scans</th>
              <th className="px-6 py-3 font-semibold">Created</th>
              <th className="px-6 py-3 font-semibold">Status</th>
              <th className="px-6 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_QR_CODES.map(q => (
              <tr key={q.id} className="border-t" style={{ borderColor: '#F3F4F6' }}>
                <td className="px-6 py-3.5 text-black font-medium flex items-center gap-2"><QrCode size={14} className="text-gray-400" /> {q.name}</td>
                <td className="px-6 py-3.5 text-blue-600 truncate max-w-[220px]">{q.link}</td>
                <td className="px-6 py-3.5 text-black">{q.scans}</td>
                <td className="px-6 py-3.5 text-black">{q.created}</td>
                <td className="px-6 py-3.5"><span className="text-xs font-semibold px-2 py-1 rounded-lg text-green-600 bg-green-50">{q.status}</span></td>
                <td className="px-6 py-3.5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 rounded-lg hover:bg-gray-100" title="Usage"><BarChart2 size={14} className="text-gray-500" /></button>
                    <button className="p-1.5 rounded-lg hover:bg-gray-100" title="Enable/disable"><Power size={14} className="text-gray-500" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
