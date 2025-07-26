import styles from "./index.module.scss";
import { useState, useEffect } from "react";
import { getProjectsConfig, loadProjectContent } from "../../config/projects";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalClosing, setIsModalClosing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                setLoading(true);
                
                const projectsConfig = await getProjectsConfig();
                
                const projectsWithContent = await Promise.all(
                    projectsConfig.map(async (project) => {
                        const content = await loadProjectContent(project.id);
                        return {
                            ...project,
                            content
                        };
                    })
                );
                
                setProjects(projectsWithContent);
            } catch (error) {
                console.error('Erreur lors du chargement des projets:', error);
            } finally {
                setLoading(false);
            }
        };
        loadProjects();
    }, []);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

    const openModal = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
        setIsModalClosing(false);
    };

    const closeModal = () => {
        setIsModalClosing(true);
        setTimeout(() => {
            setIsModalOpen(false);
            setSelectedProject(null);
            setIsModalClosing(false);
        }, 300);
    };

    if (loading) {
        return (
            <div className={styles.container} data-section="projects">
                <h2 className={styles.title}>All projects</h2>
                <div className={styles.loading}>
                    <p>Chargement des projets...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container} data-section="projects">
            <h2 className={styles.title}>All projects</h2>

            <div className={styles.projectsGrid}>
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className={styles.projectCard}
                        onClick={() => openModal(project)}
                    >
                        <div className={styles.projectImage}>
                            <img src={project.cover} alt={project.title} />
                        </div>
                        <div className={styles.projectInfo}>
                            <h3 className={styles.projectTitle}>{project.title}</h3>
                            <p className={styles.projectDate}>{project.date}</p>
                            <div className={styles.projectTags}>
                                {project.tags.map((tag, index) => (
                                    <span key={index} className={styles.tag}>{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && selectedProject && (
                <div className={`${styles.modalOverlay} ${isModalClosing ? styles.modalOverlayClosing : ''}`} onClick={closeModal}>
                    <div className={`${styles.modal} ${isModalOpen && !isModalClosing ? styles.modalOpen : ''} ${isModalClosing ? styles.modalClosing : ''}`} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeButton} onClick={closeModal}>
                            ×
                        </button>
                        <div className={styles.modalContent}>
                            <div className={styles.modalHeader}>
                                <h2>{selectedProject.title}</h2>
                                <p className={styles.modalDate}>{selectedProject.date}</p>
                                <div className={styles.modalTags}>
                                    {selectedProject.tags.map((tag, index) => (
                                        <span key={index} className={styles.modalTag}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.modalBody}>
                                <div
                                    className={styles.markdownContent}
                                    dangerouslySetInnerHTML={{ __html: selectedProject.content }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Projects;