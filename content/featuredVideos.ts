export interface FeaturedVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  link: string;
  spotlight?: boolean;
}

export const FEATURED_YOUTUBE_VIDEOS: FeaturedVideo[] = [
  {
    id: 'rayman-3-developer-retrospective',
    title: '23 Years Later, the Devs Speak - RAYMAN 3 DOCUMENTARY',
    description: 'A 23-year retrospective centered on the developers and creative work behind Rayman 3.',
    thumbnail: 'https://i.ytimg.com/vi/07oTF4Vj-74/hq720.jpg',
    link: 'https://www.youtube.com/watch?v=07oTF4Vj-74',
  },
  {
    id: 'rayman-30th-reverse-engineering',
    title: 'Rayman 30th: The Internet Got It Wrong',
    description: 'I explain why this release is much more than simple emulation by breaking down the technical choices behind it.',
    thumbnail: 'https://i.ytimg.com/vi/jU6bSHefllQ/hq720.jpg',
    link: 'https://www.youtube.com/watch?v=jU6bSHefllQ',
    spotlight: true,
  },
  {
    id: 'ubisoft-mentorship-talk',
    title: 'Ubisoft Mentored Me. I Made This UNLIKELY Game',
    description: 'I talk about my Ubisoft mentorship journey, the challenges, and the professional growth that came with it.',
    thumbnail: 'https://i.ytimg.com/vi/-2z1FbOyCks/hq720.jpg',
    link: 'https://www.youtube.com/watch?v=-2z1FbOyCks&t=10s',
  },
  {
    id: 'jsr-prototype-analysis',
    title: 'Jet Set Radio Prototype & the US Grind Radio — Game Preservation',
    description: 'A guided analysis of the JSR prototype, including what it reveals about development decisions and cut content.',
    thumbnail: 'https://i.ytimg.com/vi/ngTHrhJjtLs/hq720.jpg',
    link: 'https://www.youtube.com/watch?v=ngTHrhJjtLs&t=13s',
  },
];
