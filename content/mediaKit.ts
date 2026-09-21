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
  snapshot: { date: '2026-09-21', label: '21 September 2026' },
  email: 'hello.teloru@gmail.com',
  socials: [
    { name: 'YouTube', url: 'https://www.youtube.com/@Teloru' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@teloru_' },
    { name: 'Instagram', url: 'https://www.instagram.com/teloru_/' },
    { name: 'Twitch', url: 'https://twitch.tv/teloru' },
  ],
  reach: [
    { platform: 'YouTube', period: '90-day reporting window', metrics: [
      { value: '2,960', label: 'subscribers' }, { value: '49.1K', label: 'views' },
      { value: '1.9K', label: 'watch hours' }, { value: '+433', label: 'subscribers' },
    ] },
    { platform: 'Instagram', period: '90-day reporting window', metrics: [
      { value: '2,080', label: 'followers' }, { value: '73.3K', label: 'views' },
      { value: '51.5K', label: 'accounts reached' }, { value: '5,790', label: 'interactions' },
    ] },
    { platform: 'TikTok', period: '60-day reporting window', metrics: [
      { value: '7.2K', label: 'followers' }, { value: '12.1K', label: 'video views' },
    ] },
    { platform: 'Twitch', period: '90-day reporting window', metrics: [
      { value: '18', label: 'average viewers' }, { value: '1,978', label: 'unique viewers' },
      { value: '52h 21m', label: 'streamed' },
    ] },
  ],
  audience: {
    title: 'YouTube audience by video views', period: '90-day reporting window',
    countries: [
      { name: 'France', percent: 81.5 }, { name: 'Belgium', percent: 1.5 },
      { name: 'United States', percent: 0.8 }, { name: 'Canada', percent: 0.6 },
      { name: 'Switzerland', percent: 0.5 }, { name: 'Other countries / unspecified', percent: 15.1 },
    ],
    tiktok: { percent: '87.6%', ages: '18-34' },
  },
  featured: [
    { title: 'Rayman 30th: The Internet Got It Wrong', category: 'Technology explained',
      description: 'An accessible breakdown of the technology behind Rayman\'s anniversary release, exploring emulation, recompilation and modernisation.',
      url: rayman30.link, image: rayman30.thumbnail, imageAlt: 'Thumbnail for Rayman 30th: The Internet Got It Wrong' },
    { title: '23 Years Later, the Devs Speak - Rayman 3 Documentary', category: 'Original documentary',
      description: 'An original documentary featuring the developers behind Rayman 3 and the stories surrounding its creation.',
      url: rayman3.link, image: rayman3.thumbnail, imageAlt: 'Thumbnail for the Rayman 3 developer documentary' },
    { title: 'Developer Interviews & Event Coverage', category: 'From the show floor',
      description: 'On-location interviews and creator coverage from major gaming events, including Gamescom.',
      url: null, image: null, imageAlt: '' }, // TODO: event URL, image and descriptive alt text.
  ] satisfies MediaKitFeature[],
  reel: { views: '57.6K', period: 'September 2026', url: 'https://www.instagram.com/teloru_/reel/DdYke21i5tn/' },
  formats: ['Short-form product features', 'Livestream integrations', 'Gaming and creator setup content',
    'Behind-the-scenes production content', 'Accessible technical explainers', 'Event coverage and interviews',
    'Giveaways and community activations'],
};
