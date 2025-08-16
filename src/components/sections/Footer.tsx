import React from "react";
import styled, { keyframes } from "styled-components";

const marquee = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-50%, 0, 0);
  }
`;

const FooterContainer = styled.footer`
  position: relative;
  padding: 4rem 0 5rem 0;
  bottom: 0;
  color: #fff;
  text-align: center;
  font-family: "Source Code Pro", monospace;
  font-size: 1rem;
`;

const BannerSkills = styled.div`
  margin: 5rem 0;
  width: 100%;
  overflow: hidden;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  border-top: solid 1px #fff;
  border-bottom: solid 1px #fff;
  padding: 0.5rem;
`;

const Skills = styled.div`
  white-space: nowrap;
  display: inline-block;
  animation: ${marquee} 30s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
`;

const SkillContent = styled.div`
  display: inline-block;

  > span {
    padding: 10px 20px;
    display: inline-block;
  }
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  max-width: 50vw;
  margin: 0 auto;
  padding: 0 1rem;

  ul {
    list-style-type: none;
    padding: 0;
    text-align: left;
  }

  ul li a {
    color: #fff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ContactAndNavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  li {
    padding-left: 2rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;

    li {
      padding-left: 0;
    }
  }
`;

const Contact = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.3rem;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

const Navigation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.3rem;

  ul {
    margin-bottom: 0;

    &:not(:first-child) {
      margin-top: 0;
    }
  }

  li a {
    margin-left: 2rem;
  }

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

const Copy = styled.div`
  position: absolute;
  right: 3rem;
  bottom: 3rem;
  background-color: white;
  color: black;
  padding: 0.7rem;
  padding-bottom: 1rem;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 2rem;
  writing-mode: vertical-lr;
  transform: rotate(180deg);
  z-index: 10;

  @media (max-width: 768px) {
    right: 1rem;
    bottom: 1rem;
    font-size: 1.5rem;
    padding: 0.5rem;
    padding-bottom: 0.7rem;
  }
`;

const Symbol = styled.span`
  display: inline-block;
  transform: scale(-1);

  &::after {
    transform: rotate(270deg);
    display: inline-block;
    content: "\\00A9";
  }
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const skills = [
    "Unreal Engine",
    "C++ programming",
    "Computer graphics",
    "UI design",
    "Software engineering",
    "Shaders",
    "OpenGL",
    "Qt",
    "Matrices",
    "Mixed reality",
    "WebGL",
  ];

  return (
    <FooterContainer>
      <BannerSkills>
        <Skills>
          <SkillContent>
            {skills.map((skill, index) => (
              <span key={`first-${index}`}>{skill}</span>
            ))}
          </SkillContent>
          <SkillContent>
            {skills.map((skill, index) => (
              <span key={`second-${index}`}>{skill}</span>
            ))}
          </SkillContent>
        </Skills>
      </BannerSkills>

      <FooterContent>
        <span>Thank you for scrolling ♥</span>
        <ContactAndNavContainer>
          <Contact>
            Contact
            <ul>
              <li>
                <a href="tel:+33675444249">+33 6 75 44 42 49</a>
              </li>
              <li>
                <a href="mailto:astrid.beyer@orange.fr">
                  astrid.beyer@orange.fr
                </a>
              </li>
            </ul>
          </Contact>
          <Navigation>
            Navigation
            <ul>
              <li>
                <a href="/articles">⤷ articles</a>
                <a href="/creatives">⤷ creatives</a>
              </li>
            </ul>
            <ul>
              <li>
                <a href="/projects">⤷ projects</a>
                <a href="/research">⤷ research</a>
              </li>
            </ul>
          </Navigation>
        </ContactAndNavContainer>
      </FooterContent>

      <Copy>
        <Symbol />
        {currentYear}
      </Copy>
    </FooterContainer>
  );
};

export default Footer;
