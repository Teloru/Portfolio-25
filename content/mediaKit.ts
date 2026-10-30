import { FEATURED_YOUTUBE_VIDEOS } from './featuredVideos';

export interface MediaKitFeature {
  title: string;
  category: string;
  description: string;
  url: string | null;
  image: string | null;
  imageAlt: string;
}

const video = (id: string) => FEATURED_YOUTUBE_VIDEOS.find(item => item.id === id)!;
const rayman30 = video('rayman-30th-reverse-engineering');
const rayman3 = video('rayman-3-developer-retrospective');

// Missing URLs/assets intentionally stay null: the page renders labelled placeholders.
export const mediaKit = {
  year: '2026',
  snapshot: { date: '2026-10-30', label: '30 October 2026' },
  email: 'hello.teloru@gmail.com',
  socials: [
    { name: 'YouTube', url: 'https://www.youtube.com/@Teloru' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@teloru_' },
    { name: 'Instagram', url: 'https://www.instagram.com/teloru_/' },
    { name: 'Twitch', url: 'https://twitch.tv/teloru' },
  ],
  reach: [
    { platform: 'YouTube', period: '1 Aug - 29 Oct 2026 (90 days)', metrics: [
      { value: '3,075', label: 'subscribers' }, { value: '58,284', label: 'views' },
      { value: '1.5K', label: 'watch hours' }, { value: '+190', label: 'subscribers' },
    ] },
    { platform: 'Instagram', period: '90-day reporting window', metrics: [
      { value: '2,187', label: 'followers' }, { value: '192,966', label: 'views' },
      { value: '84,806', label: 'viewers' }, { value: '12,797', label: 'interactions' },
    ] },
    { platform: 'TikTok', period: '30 Aug - 28 Oct 2026 (60 days)', metrics: [
      { value: '11.5K', label: 'video views' }, { value: '183', label: 'profile views' },
      { value: '506', label: 'likes' }, { value: '18', label: 'comments' },
      { value: '68', label: 'shares' },
    ] },
    { platform: 'Twitch', period: '90-day reporting window',
      snapshot: { date: '2026-09-21', label: '21 September 2026' },
      metrics: [
      { value: '18', label: 'average viewers' }, { value: '1,978', label: 'unique viewers' },
      { value: '52h 21m', label: 'streamed' },
    ] },
  ],
  audience: {
    title: 'YouTube audience by video views', period: '1 Aug - 29 Oct 2026 (90 days)',
    countries: [
      { name: 'France', percent: 81.6 }, { name: 'Belgium', percent: 1.5 },
      { name: 'Canada', percent: 0.7 }, { name: 'Switzerland', percent: 0.3 },
      { name: 'United States', percent: 0.2 }, { name: 'Other countries / unspecified', percent: 15.7 },
    ],
    // YouTube age breakdown by views: 13.1% aged 18-24 + 53.7% aged 25-34.
    age: { percent: '66.8%', ages: '18-34', platform: 'YouTube' },
  },
  featured: [
    { title: 'Rayman 30th: The Internet Got It Wrong', category: 'Technology explained',
      description: 'An accessible breakdown of the technology behind Rayman\'s anniversary release, exploring emulation, recompilation and modernisation.',
      url: rayman30.link, image: rayman30.thumbnail, imageAlt: 'Thumbnail for Rayman 30th: The Internet Got It Wrong' },
    { title: '23 Years Later, the Devs Speak - Rayman 3 Documentary', category: 'Original documentary',
      description: 'An original documentary featuring the developers behind Rayman 3 and the stories surrounding its creation.',
      url: rayman3.link, image: rayman3.thumbnail, imageAlt: 'Thumbnail for the Rayman 3 developer documentary' },
    { title: 'The Future of Rayman, Developer Secrets & SEGA', category: 'Gamescom coverage',
      description: 'Three days at Gamescom, from B2B demos to Ubisoft\'s creator event. I talk with the developers behind Rayman Legends Retold about the unlikely pairing of UbiArt and Snowdrop and what comes next for Rayman, then head to SEGA to try their upcoming games and share my hands-on impressions.',
      url: 'https://www.youtube.com/watch?v=RAzuMhNj93I',
      image: 'https://i.ytimg.com/vi/RAzuMhNj93I/maxresdefault.jpg',
      imageAlt: 'Thumbnail for Teloru\'s Gamescom video about Rayman, developers and SEGA' },
  ] satisfies MediaKitFeature[],
  reel: { views: '72.6K', published: 'September 2026', url: 'https://www.instagram.com/teloru_/reel/DdYke21i5tn/' },
  brandExperience: [
    {
      name: 'JPFans',
      status: 'COLLABORATION IN PROGRESS',
      format: 'Creator collaboration',
      description: 'I ordered a Hello Kitty Dreamcast through JPFans, and now I\'m making a game to run on it! I\'m sharing a referral link with my community as part of the collaboration. The teaser short is already out, with a longer video still in the works.',
    },
    {
      name: 'XP-PEN',
      status: 'UNPAID PRODUCT COLLABORATION',
      format: 'Product collaboration',
      description: 'XP-PEN sent me a graphics tablet to try out, and I later gave it away to my community. It wasn\'t a paid partnership: I got to test the product, share it with my audience and organise the giveaway.',
    },
  ],
  formats: ['Short-form product features', 'Livestream integrations', 'Gaming and creator setup content',
    'Behind-the-scenes production content', 'Accessible technical explainers', 'Event coverage and interviews',
    'Giveaways and community activations'],
};
