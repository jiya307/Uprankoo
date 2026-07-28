import Layout from '../components/Layout';
import LeadForm from '../components/LeadForm';
import { Helmet } from "react-helmet-async";

export default function ContactPage() {
  return (
    <>
    <Helmet>
  <title>Contact Us | Upranko</title>

  <meta
    name="description"
    content="Contact Upranko for NFC Business Cards, QR Review Stands, and business growth solutions."
  />

  <link rel="canonical" href="https://upranko.in/contact" />
</Helmet>
    <Layout>
      <LeadForm />
    </Layout>
    </>
  );
}
