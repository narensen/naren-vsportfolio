import styles from './about.module.css'; // Import the CSS module

const AboutPage = () => {
  return (
    <div className={styles['about-container']}>
      <h3 className={styles['about-title']}>A Little Bit About Me</h3>
      <p className={styles['about-text']}>
        I’m <strong>Naren</strong>! I’m an aspiring computer vision and machine learning engineer, passionate about building AI-driven solutions that can solve real-world problems. Currently, I’m pursuing my degree in <strong>Information Science Engineering</strong> at <strong>JAIN FET Bangalore</strong>.
      </p>
      <p className={styles['about-text']}>
        I’ve worked on several projects involving deep learning, real-time object tracking, and large language models. My recent work includes publishing a paper on <strong>LARMS</strong>, a mental health companion, and working on integrating <strong>SLAM</strong> with tracker-based object localization for real-time navigation.
      </p>
      <p className={styles['about-text']}>
        I’m constantly learning and striving to improve my skills in <strong>C++</strong>, <strong>Rust</strong>, <strong>Kubernetes</strong>, and advanced computer vision techniques. I aim to join <strong>Tesla</strong> as an intern and contribute to cutting-edge AI and CV technologies.
      </p>
      <p className={styles['about-text']}>
        Apart from coding, I enjoy playing <strong>frisbee</strong> and <strong>cricket</strong>. Feel free to check out my <a href="https://github.com/narensen" className={styles['about-link']}>GitHub</a> or connect with me for collaboration!
      </p>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: { title: 'About' },
  };
}

export default AboutPage;
