import { Check, Zap, CreditCard, Crown } from 'lucide-react';
import DashboardLayout from '../layout/DashboardLayout';

const PLANS = [
  { name:'Starter', price:'₹999', period:'one-time', icon:<Zap size={17} className="text-blue-400"/>, color:'#3B82F6', current:true,
    desc:'Perfect for single-location businesses.',
    features:['1 NFC standee device','Smart review routing','Private feedback inbox','Basic analytics','QR code management','Email support'] },
  { name:'Growth', price:'₹1,999', period:'/month', icon:<Crown size={17} className="text-yellow-400"/>, color:'#F59E0B', current:false, badge:'Popular',
    desc:'For growing businesses with deeper insights.',
    features:['3 NFC devices','AI review generator','Advanced analytics','Customer database','Multi-location support','Priority support','White-label QR codes'] },
  { name:'Pro', price:'₹4,999', period:'/month', icon:<Crown size={17} className="text-purple-400"/>, color:'#8B5CF6', current:false, badge:'Best Value',
    desc:'Full automation for serious businesses.',
    features:['10 NFC devices','Unlimited AI generations','Real-time alerts','API access','Custom branding','Dedicated account manager','Monthly strategy call'] },
  { name:'Agency', price:'₹14,999', period:'/month', icon:<Crown size={17} className="text-green-400"/>, color:'#22C55E', current:false,
    desc:'For agencies managing multiple clients.',
    features:['Unlimited NFC devices','Client management portal','White-label dashboard','Bulk QR management','Custom integrations','Priority onboarding','SLA guarantee'] },
];

export default function SubscriptionPage() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-white font-black text-2xl mb-1">Subscription</h1>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Manage your plan and billing</p>
      </div>

      <div className="glass-card p-6 rounded-2xl mb-8 flex items-center justify-between flex-wrap gap-4"
        style={{ background: 'rgba(59,130,246,0.06)', borderColor: 'rgba(59,130,246,0.2)' }}>
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(59,130,246,0.18)', border: '1px solid rgba(59,130,246,0.3)' }}>
            <CreditCard size={20} className="text-blue-400" />
          </div>
          <div>
            <p className="text-white font-bold text-sm">Current Plan: <span className="text-blue-400">Starter (Pilot)</span></p>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>One-time payment — no renewal needed</p>
          </div>
        </div>
        <span className="badge-success">Active</span>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
        {PLANS.map(plan => (
          <div key={plan.name} className={`glass-card rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 ${plan.current ? 'ring-2 ring-blue-500/40' : ''}`}>
            {(plan as { badge?: string }).badge && (
              <div className="py-2 text-center text-xs font-bold" style={{ background: `${plan.color}18`, color: plan.color }}>
                {(plan as { badge?: string }).badge}
              </div>
            )}
            {plan.current && <div className="py-2 text-center text-xs font-bold text-blue-400" style={{ background: 'rgba(59,130,246,0.1)' }}>Current Plan</div>}
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${plan.color}15` }}>{plan.icon}</div>
                <h3 className="text-white font-bold text-base">{plan.name}</h3>
              </div>
              <div className="flex items-end gap-1 my-4">
                <span className="text-white font-black text-3xl">{plan.price}</span>
                <span className="mb-1 text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>{plan.period}</span>
              </div>
              <p className="text-xs leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.45)' }}>{plan.desc}</p>
              <div className="space-y-2.5 flex-1">
                {plan.features.map(f => (
                  <div key={f} className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${plan.color}18` }}>
                      <Check size={9} style={{ color: plan.color }} />
                    </div>
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>{f}</span>
                  </div>
                ))}
              </div>
              <button className={`mt-6 w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${plan.current ? 'cursor-default text-blue-400' : 'text-white hover:-translate-y-0.5'}`}
                style={plan.current
                  ? { background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)' }
                  : { background: `linear-gradient(135deg, ${plan.color}, ${plan.color}CC)`, boxShadow: `0 4px 16px ${plan.color}30` }
                }>
                {plan.current ? '✓ Active' : 'Upgrade'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
