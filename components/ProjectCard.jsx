import Image from 'next/image';
import styles from '../styles/ProjectCard.module.css';

const ProjectCard = ({ project }) => {
  return (
    <div className={styles.card}>
      <Image
        src={project.image}
        alt={project.name}
        width={600}
        height={300}
        objectFit="cover"
        className={styles.projectImage}
      />
      <div className={styles.content}>
        {/* Changed h3 to use a class */}
        <h3 className={styles.projectTitle}>{project.name}</h3>
        <p>{project.description}</p>
        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className={styles.cta}>
          <div className={styles.links}>
            {project.source_code && (
              <a
                href={project.source_code}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Source Code
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
