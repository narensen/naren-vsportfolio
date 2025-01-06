import ArticleCard from '../components/ArticleCard';
import styles from '../styles/ArticlesPage.module.css';

const ArticlesPage = ({ papers }) => {
  return (
    <>
      <h3>
        Research Papers by{' '}
        <a
          href="https://github.com/narensen"
          target="_blank"
          rel="noopener"
          className={styles.underline}
        >
          Naren
        </a>
      </h3>
      <div className={styles.container}>
        {papers.map((paper) => (
          <ArticleCard key={paper.id} article={paper} />
        ))}
      </div>
    </>
  );
};

export async function getStaticProps() {
  const papers = [
    {
      id: 1,
      title: 'LARMS: Enabling LLMs to Provide Remedy for Mental Status',
      description:
        'This paper discusses a novel mental health companion using large language models and evaluates its performance using BLEU and CIDEr metrics.',
      url: '', // Add the link to LARMS paper
    },
    {
      id: 2,
      title:
        'CBAM-EfficientNetV2 for Histopathology Image Classification using Transfer Learning and Dual Attention Mechanisms',
      description:
        'A research paper introducing a novel approach combining CBAM and EfficientNetV2 for breast cancer histopathology image classification, achieving state-of-the-art results.',
      url: 'https://www.researchgate.net/publication/387755688_CBAM-EfficientNetV2_for_Histopathology_Image_Classification_using_Transfer_Learning_and_Dual_Attention_Mechanisms', // Add the link to this paper when available
    },
  ];

  return {
    props: { title: 'Research Papers', papers },
    revalidate: 60,
  };
}

export default ArticlesPage;
