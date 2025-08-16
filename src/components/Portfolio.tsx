import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";

// save plugin ScrollTo
gsap.registerPlugin(ScrollToPlugin);

const PortfolioContainer = styled.div`
  position: relative;
  z-index: 2;
  height: 100vh;
  overflow-y: auto;
  scroll-behavior: smooth;
`;

const Section = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
`;

const AboutSection = styled.section`
  min-height: 100vh;
  display: block;
  padding: 0;
  position: relative;
`;

// navmenu with dots
const Navigation = styled.nav`
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NavDot = styled.button<{ $active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  background: ${(props) =>
    props.$active ? "rgba(255, 255, 255, 0.9)" : "transparent"};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.8);
    transform: scale(1.2);
  }
`;

const sections = ["hero", "about", "projects", "contact"];

const Portfolio: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // GSAP config for entry animations
    const sections = containerRef.current.querySelectorAll("section");

    gsap.set(sections, {
      opacity: 0,
      y: 50,
    });

    // animation sequential appearing
    gsap.to(sections, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
      delay: 0.5,
    });

    // handle scroll to update active section
    const handleScroll = () => {
      const scrollTop = containerRef.current?.scrollTop || 0;
      const sectionHeight = window.innerHeight;
      const currentSection = Math.round(scrollTop / sectionHeight);
      setActiveSection(Math.min(currentSection, sections.length - 1));
    };

    containerRef.current.addEventListener("scroll", handleScroll);

    return () => {
      containerRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // navigate to a section
  const scrollToSection = (index: number) => {
    if (!containerRef.current) return;

    const targetY = index * window.innerHeight;
    gsap.to(containerRef.current, {
      scrollTo: { y: targetY },
      duration: 1,
      ease: "power2.inOut",
    });
  };

  const handleScrollTo = (index: number) => {
    const section = containerRef.current?.querySelector(
      `section:nth-of-type(${index + 1})`
    );
    if (section) {
      gsap.to(containerRef.current, {
        scrollTo: { y: section, offsetY: 70 },
        duration: 1,
        ease: "power2.out",
      });
    }
  };

  return (
    <PortfolioContainer ref={containerRef}>
      <Navigation>
        {sections.map((section, index) => (
          <NavDot
            key={section}
            $active={activeSection === index}
            onClick={() => {
              setActiveSection(index);
              handleScrollTo(index);
            }}
          />
        ))}
      </Navigation>
      <Section>
        <Hero />
      </Section>
      <AboutSection>
        <About />
      </AboutSection>
      <Section>
        <Projects />
      </Section>
      <Section>
        <Contact />
      </Section>
    </PortfolioContainer>
  );
};

export default Portfolio;
