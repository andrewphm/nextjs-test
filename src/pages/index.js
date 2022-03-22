import Head from 'next/head';

import Layout from '../components/layouts/Layout';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const Home = () => {
  return (
    <>
      <Head>
        <title>Margatsni</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <section className="mx-auto my-0 flex py-[30px]">
          <div>hihi</div>
        </section>
      </Layout>
    </>
  );
};

export default Home;
