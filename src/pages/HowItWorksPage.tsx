import { Helmet } from "react-helmet-async";
import Layout from '../components/Layout';
import HowItWorks from '../components/HowItWorks';

export default function HowItWorksPage() {
  return (
    <>
      <Helmet>
  <title>How It Works | Upranko</title>

  <meta
    name="description"
    content="Learn how Upranko NFC Business Cards and QR Review Stands work to increase customer engagement and Google reviews."
  />

  <link rel="canonical" href="https://upranko.in/how-it-works" />
</Helmet>

      <Layout>
      
      <HowItWorks />
    </Layout>
    </>
  );
}

















