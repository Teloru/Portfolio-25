import styled from "styled-components";

const ProjectsContainer = styled.div`
  max-width: 1200px;
  width: 100%;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #ffffff;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
`;

const ProjectCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #ffffff;
  }

  p {
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechTag = styled.span`
  background: rgba(32, 128, 255, 0.2);
  color: #60a5fa;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  border: 1px solid rgba(32, 128, 255, 0.3);
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const ProjectLink = styled.a`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

interface Project {
  title: string;
  description: string;
  technologies: string[];
  demoUrl?: string;
  codeUrl?: string;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      title: "Portfolio Interactif",
      description:
        "Portfolio personnel avec animations Three.js et shader de dithering réactif aux mouvements de la souris.",
      technologies: [
        "React",
        "TypeScript",
        "Three.js",
        "GSAP",
        "Styled Components",
      ],
      demoUrl: "#",
      codeUrl: "#",
    },
    {
      title: "Dashboard Analytics",
      description:
        "Interface d'administration moderne avec graphiques interactifs et gestion en temps réel des données.",
      technologies: ["React", "TypeScript", "Chart.js", "React Query"],
      demoUrl: "#",
      codeUrl: "#",
    },
    {
      title: "E-commerce App",
      description:
        "Application e-commerce complète avec panier, paiement intégré et interface responsive.",
      technologies: ["Next.js", "TypeScript", "Stripe", "Prisma"],
      demoUrl: "#",
      codeUrl: "#",
    },
  ];

  return (
    <ProjectsContainer>
      <SectionTitle>Projets</SectionTitle>
      <ProjectGrid>
        {projects.map((project, index) => (
          <ProjectCard key={index}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <TechStack>
              {project.technologies.map((tech, techIndex) => (
                <TechTag key={techIndex}>{tech}</TechTag>
              ))}
            </TechStack>
            <ProjectLinks>
              {project.demoUrl && (
                <ProjectLink
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Démo
                </ProjectLink>
              )}
              {project.codeUrl && (
                <ProjectLink
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Code
                </ProjectLink>
              )}
            </ProjectLinks>
          </ProjectCard>
        ))}
      </ProjectGrid>
    </ProjectsContainer>
  );
};

export default Projects;
