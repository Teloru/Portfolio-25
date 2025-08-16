import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";

const HeroContainer = styled.div`
  text-align: center;
  max-width: 800px;
`;

const Title = styled.h1`
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #ffffff, #a0a0a0);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.1;
`;

const Subtitle = styled.p`
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2rem;
  font-weight: 300;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
`;

const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.8 });

    // animation title
    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 0, y: 30 });
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    }

    // animation subtitle
    if (subtitleRef.current) {
      gsap.set(subtitleRef.current, { opacity: 0, y: 20 });
      tl.to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      );
    }

    // animation desc
    if (descriptionRef.current) {
      gsap.set(descriptionRef.current, { opacity: 0, y: 20 });
      tl.to(
        descriptionRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3"
      );
    }
  }, []);

  return (
    <HeroContainer>
      <Title ref={titleRef}>Hi, I'm Astrid</Title>
      <Subtitle ref={subtitleRef}>
        Computer Graphics Engineer & Software Developer
      </Subtitle>
      <Description ref={descriptionRef}>
        I love creating stunning visuals and immersive experiences using the
        latest technologies.
      </Description>
    </HeroContainer>
  );
};

export default Hero;
