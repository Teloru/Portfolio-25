import styled from "styled-components";

const ContactContainer = styled.div`
  max-width: 600px;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #ffffff;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 3rem;
  line-height: 1.6;
`;

const ContactLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
`;

const ContactLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-2px);
  }

  span {
    font-size: 1.2rem;
  }
`;

const Email = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;

  h3 {
    color: #ffffff;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }

  a {
    color: #60a5fa;
    text-decoration: none;
    font-size: 1.1rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Contact: React.FC = () => {
  return (
    <ContactContainer>
      <SectionTitle>Contact</SectionTitle>
      <Description>
        lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Description>

      <ContactLinks>
        <ContactLink
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>💼</span>
          LinkedIn
        </ContactLink>
        <ContactLink
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>🐙</span>
          GitHub
        </ContactLink>
        <ContactLink
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>🐦</span>
          Twitter
        </ContactLink>
      </ContactLinks>

      <Email>
        <h3>Email</h3>
        <a href="mailto:votre.email@example.com">email@example.com</a>
      </Email>
    </ContactContainer>
  );
};

export default Contact;
