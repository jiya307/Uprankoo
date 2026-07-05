import { ShieldCheck, FolderCog, ExternalLink } from 'lucide-react';
import DashboardLayout from '../layout/DashboardLayout';

const TOOLS = [
  {
    title: 'Platform Admin',
    description: 'Open the main Uprankoo administration system.',
    buttonText: 'Open Platform Admin',
    url: 'https://uprankoadmin.vercel.app/',
    icon: ShieldCheck,
  },
  {
    title: 'Files Manager',
    description: 'Open the file management system.',
    buttonText: 'Open Files Manager',
    url: 'https://files-eta-inky.vercel.app/',
    icon: FolderCog,
  },
];

export default function OwnerAdminPage() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-black font-black text-2xl mb-1">Owner Admin Panel</h1>
        <p className="text-sm" style={{ color: 'black' }}>Quick access to external administration tools</p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {TOOLS.map(({ title, description, buttonText, url, icon: Icon }) => (
          <div key={title} className="glass-card p-6 rounded-2xl flex flex-col">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
              style={{ background: 'rgba(59,130,246,0.14)', border: '1px solid rgba(59,130,246,0.2)' }}
            >
              <Icon size={20} style={{ color: '#2563EB' }} />
            </div>
            <h3 className="text-black font-bold text-base mb-1.5">{title}</h3>
            <p className="text-sm mb-5 flex-1" style={{ color: '#6B7280' }}>{description}</p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 w-fit"
              style={{ background: 'linear-gradient(135deg, #3B82F6, #2563EB)', color: 'white' }}
            >
              {buttonText} <ExternalLink size={14} />
            </a>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
