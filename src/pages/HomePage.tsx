import { Helmet } from "react-helmet-async";
import Hero from "../components/Hero";
import Layout from "../components/Layout";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Upranko | NFC Business Cards & QR Review Stands</title>

        <meta
          name="description"
          content="Upranko provides NFC Business Cards and QR Review Stands to help businesses collect more Google reviews and grow online."
        />

        <link rel="canonical" href="https://upranko.in/" />
      </Helmet>

      <Layout>
        <Hero />
      </Layout>
    </>
  );
}