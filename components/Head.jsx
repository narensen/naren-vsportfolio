import Head from 'next/head';

const CustomHead = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content="An aspiring computer vision and machine learning engineer, building innovative AI solutions."
      />
      <meta
        name="keywords"
        content="Naren, computer vision, machine learning, AI engineer, Naren portfolio, full-stack developer, ML projects, CV projects, Tesla internship"
      />
      <meta property="og:title" content="Naren's Portfolio" />
      <meta
        property="og:description"
        content="An aspiring computer vision and machine learning engineer, building cutting-edge AI solutions."
      />
      <meta property="og:url" content="https://narsen.vercel.app" />
    </Head>
  );
};

export default CustomHead;

CustomHead.defaultProps = {
  title: 'Naren Sengodan',
};
