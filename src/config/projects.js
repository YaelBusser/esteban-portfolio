import {marked} from 'marked';

const parseYamlFrontMatter = (markdownContent) => {
    const yamlMatch = markdownContent.match(/^---\s*([\s\S]*?)\s*---/);
    if (!yamlMatch) return null;

    const yamlContent = yamlMatch[1];
    const metadata = {};

    yamlContent.split('\n').forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
            const key = line.substring(0, colonIndex).trim();
            let value = line.substring(colonIndex + 1).trim();
            
            if (value.startsWith('"') && value.endsWith('"')) {
                value = value.slice(1, -1);
            }
            
            if (key === 'tags' && value.startsWith('[') && value.endsWith(']')) {
                value = value.slice(1, -1).split(',').map(tag => tag.trim());
            }
            
            metadata[key] = value;
        }
    });

    return metadata;
};

const PROJECTS_LIST = [
    'UsineDuFutur',
    'FormulePolytechniqueMontreal',
    'Portfolio'
];

export const getProjectsConfig = async () => {
    try {
        const projectsConfig = [];

        for (const projectId of PROJECTS_LIST) {
            try {
                const response = await fetch(`/esteban-portfolio/projects/${projectId}/index.md`);
                if (!response.ok) {
                    console.warn(`Projet ${projectId} non trouvé, ignoré`);
                    continue;
                }
                
                const markdownContent = await response.text();
                const metadata = parseYamlFrontMatter(markdownContent);
                
                if (!metadata) {
                    console.warn(`Aucune métadonnée YAML trouvée pour ${projectId}`);
                    continue;
                }

                const projectConfig = {
                    id: projectId,
                    title: metadata.title || 'Projet sans titre',
                    date: metadata.date || '',
                    cover: metadata.cover ? metadata.cover.replace('./', `/esteban-portfolio/projects/${projectId}/`) : '',
                    tags: metadata.tags || []
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
        const response = await fetch(`/esteban-portfolio/projects/${projectId}/index.md`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const markdownContent = await response.text();
        const contentWithoutYaml = markdownContent.replace(/^---\s*[\s\S]*?---\s*/m, '');
        const htmlContent = marked(contentWithoutYaml);
        
        return htmlContent;
    } catch (error) {
        console.error(`Erreur lors du chargement du projet ${projectId}:`, error);
        return '<p>Contenu non disponible</p>';
    }
}; 