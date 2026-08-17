import React from 'react';
import {
  ArrowUpRight,
  Code2,
  Download,
  Linkedin,
  Play,
  Twitch,
  Youtube,
} from 'lucide-react';
import { FEATURED_YOUTUBE_VIDEOS } from '../content/featuredVideos';

const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@Teloru';
const TWITCH_URL = 'https://twitch.tv/teloru';
const LINKEDIN_URL = 'https://www.linkedin.com/in/astrid-be/';
const CV_URL = '/documents/Astrid-Beyer-CV-2026.pdf';

const GamescomPage: React.FC = () => {
  const spotlightVideo = FEATURED_YOUTUBE_VIDEOS.find((video) => video.spotlight);
  const otherVideos = FEATURED_YOUTUBE_VIDEOS.filter((video) => !video.spotlight);

  return (
    <div className="gamescom-page">
      <header className="topbar">
        <a className="brand-mark" href="/" aria-label="Back to Astrid Beyer's portfolio">AB.</a>
        <span>GAMESCOM_2026</span>
      </header>

      <main className="link-page">
        <section className="profile" aria-labelledby="page-title">
          <p className="kicker">MY NAME IS</p>
          <h1 id="page-title">Astrid <span>“Teloru”</span> Beyer</h1>
          <p className="role">3D Programmer &amp; Video Game Creator</p>
          <p className="bio">Real-time 3D, game development and stories from behind the screen.</p>
        </section>

        <section className="link-group" aria-labelledby="watch-title">
          <div className="group-heading">
            <span>01</span>
            <h2 id="watch-title">WATCH MY WORK</h2>
          </div>

          <div className="channel-grid">
            <a className="link-card" href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noreferrer">
              <span className="link-icon"><Youtube size={20} aria-hidden="true" /></span>
              <span className="link-copy">
                <strong>YouTube</strong>
                <small>@Teloru</small>
              </span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>

            <a className="link-card" href={TWITCH_URL} target="_blank" rel="noreferrer">
              <span className="link-icon"><Twitch size={20} aria-hidden="true" /></span>
              <span className="link-copy">
                <strong>Twitch</strong>
                <small>twitch.tv/teloru</small>
              </span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>

          {spotlightVideo && (
            <a className="featured-video" href={spotlightVideo.link} target="_blank" rel="noreferrer">
              <div className="featured-thumbnail">
                <img src={spotlightVideo.thumbnail} alt="" width="480" height="360" fetchPriority="high" />
                <span className="play-button"><Play size={17} fill="currentColor" aria-hidden="true" /></span>
              </div>
              <div className="featured-copy">
                <span className="featured-label">START HERE // FEATURED</span>
                <strong>{spotlightVideo.title}</strong>
                <small>{spotlightVideo.description}</small>
              </div>
              <ArrowUpRight className="featured-arrow" size={17} aria-hidden="true" />
            </a>
          )}

          <div className="compact-links">
            {otherVideos.map((video, index) => (
              <a href={video.link} key={video.id} target="_blank" rel="noreferrer">
                <span className="compact-index">0{index + 2}</span>
                <strong>{video.title}</strong>
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>

        <section className="link-group" aria-labelledby="hire-title">
          <div className="group-heading">
            <span>02</span>
            <h2 id="hire-title">HIRE ME</h2>
          </div>

          <div className="professional-links">
            <a className="link-card primary-link" href={CV_URL} download>
              <span className="link-icon"><Download size={19} aria-hidden="true" /></span>
              <span className="link-copy">
                <strong>Download my CV</strong>
                <small>PDF // 2026</small>
              </span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>

            <a className="link-card" href={LINKEDIN_URL} target="_blank" rel="noreferrer">
              <span className="link-icon"><Linkedin size={19} aria-hidden="true" /></span>
              <span className="link-copy">
                <strong>LinkedIn</strong>
                <small>Professional profile</small>
              </span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>

            <a className="link-card" href="/#engineering">
              <span className="link-icon"><Code2 size={19} aria-hidden="true" /></span>
              <span className="link-copy">
                <strong>Development portfolio</strong>
                <small>C++ // 3D // Game dev</small>
              </span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>Astrid Beyer / Teloru</span>
        <span>3D // CODING // GAMES</span>
      </footer>
    </div>
  );
};

export default GamescomPage;
