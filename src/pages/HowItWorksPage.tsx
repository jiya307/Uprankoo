import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import HowItWorks from '../components/HowItWorks';

export default function HowItWorksPage() {
  return (
    <Layout>
      <PageHeader
        label="How It Works"
        title={<>Three Steps to a <span className="gold-text-animate">Perfect Reputation</span></>}
        subtitle="No technical skills required. Place the standee, let it work, and watch your Google reviews grow on autopilot."
        crumb="How It Works"
      />
      <HowItWorks />
    </Layout>
  );
}
