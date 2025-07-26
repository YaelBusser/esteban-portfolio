import {marked} from 'marked';

const PROJECTS_LIST = [
    'UsineDuFutur',
    'FormulePolytechniqueMontreal',
    'Portfolio'
];

const fixImagePaths = (content, projectId) => {
    return content.replace(/\.\/([^)\s]+\.(jpg|jpeg|png|gif|svg))/g, `/esteban-portfolio/projects/${projectId}/$1`);
};

export const getProjectsConfig = async () => {
    try {
        const projectsConfig = [];

        for (const projectId of PROJECTS_LIST) {
            try {
                const response = await fetch(`/esteban-portfolio/projects/${projectId}/project.json`);
                if (!response.ok) {
                    console.warn(`Projet ${projectId} non trouvé, ignoré`);
                    continue;
                }
                
                const projectData = await response.json();
                
                const projectConfig = {
                    id: projectData.id,
                    title: projectData.title || 'Projet sans titre',
                    date: projectData.date || '',
                    cover: projectData.cover ? projectData.cover.replace('./', `/esteban-portfolio/projects/${projectId}/`) : '',
                    tags: projectData.tags || []
                };

                projectsConfig.push(projectConfig);
            } catch (error) {
                console.error(`Erreur lors du chargement du projet ${projectId}:`, error);
            }
        }

        return projectsConfig;
    } catch (error) {
        console.error('Erreur lors du chargement de la configuration des projets:', error);
        return [];
    }
};

export const loadProjectContent = async (projectId) => {
    try {
        const response = await fetch(`/esteban-portfolio/projects/${projectId}/project.json`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const projectData = await response.json();
        let markdownContent = projectData.content || '';
        
        markdownContent = fixImagePaths(markdownContent, projectId);
        
        const htmlContent = marked(markdownContent);
        
        return htmlContent;
    } catch (error) {
        console.error(`Erreur lors du chargement du projet ${projectId}:`, error);
        return '<p>Contenu non disponible</p>';
    }
}; 