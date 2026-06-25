import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import ValueProps from '../components/ValueProps';
import SocialProof from '../components/SocialProof';

export default function BenefitsPage() {
  return (
    <Layout>
      <PageHeader
        label="Why upRanko"
        title={<>Built for <span className="gold-text-animate">Local Business</span> Owners</>}
        subtitle="One smart NFC device. Six powerful benefits. Zero technical skills needed."
        crumb="Benefits"
      />
      <ValueProps />
      <SocialProof />
    </Layout>
  );
}
