import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import Pricing from '../components/Pricing';

export default function PricingPage() {
  return (
    <Layout>
      <PageHeader
        label="Pricing"
        title={<>One Simple <span className="gold-text-animate">Investment</span></>}
        subtitle="No subscriptions. No hidden fees. One-time setup and you're growing on autopilot."
        crumb="Pricing"
      />
      <Pricing />
    </Layout>
  );
}
