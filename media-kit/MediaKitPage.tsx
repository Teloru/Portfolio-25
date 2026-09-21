import React, { useState } from 'react';
import { ArrowUpRight, Mail, Video } from 'lucide-react';
import { mediaKit, type MediaKitFeature } from '../content/mediaKit';

function ExternalLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}<ArrowUpRight size={16} aria-hidden="true" /><span className="mk-sr"> (opens in a new tab)</span></a>;
}

function SocialLinks() {
  return <div className="mk-socials">{mediaKit.socials.map(social => social.url
    ? <ExternalLink key={social.name} href={social.url} className="mk-button">{social.name}</ExternalLink>
    : <span key={social.name} className="mk-button mk-pending">{social.name}<small>Link pending</small></span>)}</div>;
}

function SectionHeading({ number, id, children }: { number: string; id: string; children: React.ReactNode }) {
  return <div className="mk-heading"><span>{number} //</span><h2 id={id}>{children}</h2></div>;
}

function SnapshotDate() {
  return <time dateTime={mediaKit.snapshot.date}>{mediaKit.snapshot.label}</time>;
}

function FeatureCard({ item, index }: { item: MediaKitFeature; index: number }) {
  const [failed, setFailed] = useState(false);
  const thumbnail = <>
      {item.image && !failed ? <img src={item.image} alt={item.imageAlt} width="480" height="360" loading="lazy" onError={() => setFailed(true)} />
        : <div className="mk-image-placeholder"><Video size={36} aria-hidden="true" /><span>{item.image ? 'Preview unavailable' : 'Event coverage image pending'}</span></div>}
      <span className="mk-category">{item.category}</span>
    </>;
  return <article className={`mk-feature ${index === 0 ? 'mk-spotlight' : ''}`}>
    {item.url ? <a className="mk-thumbnail" href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`Watch ${item.title} (opens in a new tab)`}>{thumbnail}</a>
      : <div className="mk-thumbnail">{thumbnail}</div>}
    <div className="mk-feature-copy"><h3>{item.title}</h3><p>{item.description}</p>
      {item.url ? <ExternalLink href={item.url}>Watch on YouTube</ExternalLink> : <span className="mk-note">Coverage link pending</span>}
    </div>
  </article>;
}

export default function MediaKitPage() {
  return <div className="media-kit">
    <a className="mk-skip" href="#main">Skip to content</a>
    <header className="mk-topbar mk-container">
      <a className="mk-brand" href="/" aria-label="Back to Astrid Beyer's portfolio">AB.</a>
      <nav aria-label="Media kit navigation"><a href="#work">Selected work</a><a href="#contact">Let's talk <ArrowUpRight size={14} aria-hidden="true" /></a></nav>
    </header>
    <main id="main" className="mk-container" tabIndex={-1}>
      <section className="mk-hero" aria-labelledby="page-title">
        <p className="mk-eyebrow">MEDIA KIT // {mediaKit.year}</p>
        <div className="mk-title-line"><h1 id="page-title"><img className="mk-brand-image" src="/img/teloru_brand_white.png" alt="Teloru" width="1920" height="1080" fetchPriority="high" /></h1></div>
        <p className="mk-subtitle">Gaming · Game Dev · Tech</p>
        <div className="mk-intro"><p className="mk-lead">I'm Teloru, a French gaming creator and 3D graphics programmer. I love digging into how games are made and talking to the people who make them.</p>
          <p>Sometimes that turns into a full documentary, sometimes an interview, a short video or a chat on stream. I'm especially into the technical side of games, and I love making it interesting even if you've never written a line of code.</p></div>
        <div className="mk-hero-links"><SocialLinks /><a className="mk-button mk-primary" href="#contact"><Mail size={16} aria-hidden="true" /> Contact</a></div>
      </section>

      <section className="mk-section" aria-labelledby="reach-title">
        <SectionHeading number="01" id="reach-title">Audience & reach</SectionHeading>
        <p className="mk-note">Stats recorded on <SnapshotDate />. This is a fixed snapshot and is not updated automatically.</p>
        <div className="mk-metrics">{mediaKit.reach.map(channel => <article className="mk-card mk-platform-card" key={channel.platform}>
          <h3><ExternalLink href={mediaKit.socials.find(social => social.name === channel.platform)!.url} className="mk-platform-link">{channel.platform}</ExternalLink></h3><p className="mk-period">{channel.period}<br />Recorded <SnapshotDate /></p>
          <dl>{channel.metrics.map((metric, index) => <div className={index === 0 ? 'mk-main-stat' : 'mk-stat'} key={`${metric.label}-${index}`}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>)}</dl>
        </article>)}</div>
        <p className="mk-note">Follower and subscriber counts are as recorded on that date. Activity figures cover each platform's reporting window at the time of the snapshot, not today's date. Figures are not combined across platforms.</p>
      </section>

      <section className="mk-section" aria-labelledby="audience-title">
        <SectionHeading number="02" id="audience-title">Audience profile</SectionHeading>
        <p className="mk-section-intro">A primarily French-speaking gaming audience interested in video game culture, game development and technology.</p>
        <div className="mk-audience-grid"><div className="mk-card mk-geography"><h3>{mediaKit.audience.title}</h3><p className="mk-period">{mediaKit.audience.period}<br />Recorded <SnapshotDate /></p>
          <ul className="mk-bars">{mediaKit.audience.countries.map(country => <li key={country.name}><div><span>{country.name}</span><strong>{country.percent}%</strong></div><div className="mk-track" aria-hidden="true"><span style={{ width: `${country.percent}%` }} /></div></li>)}</ul>
          <p className="mk-note">Based on video views, not unique viewers.</p>
        </div><aside className="mk-card mk-age"><p className="mk-eyebrow">TIKTOK // FOLLOWERS</p><strong>{mediaKit.audience.tiktok.percent}</strong><p>of my TikTok followers are between <b>{mediaKit.audience.tiktok.ages} years old.</b></p><p className="mk-note">Recorded <SnapshotDate /></p></aside></div>
      </section>

      <section id="work" className="mk-section" aria-labelledby="work-title">
        <SectionHeading number="03" id="work-title">Selected content</SectionHeading>
        <div className="mk-features">{mediaKit.featured.map((item, index) => <FeatureCard key={item.title} item={item} index={index} />)}</div>
        <aside className="mk-reel"><div><p className="mk-eyebrow">INSTAGRAM // REEL</p><p>Top-performing Instagram Reel · {mediaKit.reel.period}</p><p className="mk-note">Views recorded on <SnapshotDate /></p></div><strong>{mediaKit.reel.views} <span>views</span></strong>{mediaKit.reel.url ? <ExternalLink href={mediaKit.reel.url}>Watch Reel</ExternalLink> : <span className="mk-note">Reel link pending</span>}</aside>
      </section>

      <section className="mk-section" aria-labelledby="collaborate-title">
        <SectionHeading number="04" id="collaborate-title">Let's collaborate (ﾉ◕ヮ◕)ﾉ*:・ﾟ✧ </SectionHeading>
        <div className="mk-collab"><div><p className="mk-lead">A game I can't put down, new gear to try, or a reason to go behind the scenes? That's my kind of project!</p><p>I want to work on things I'm excited to share with my community. If you think we'd get along, send me your idea. Let's figure out what we could make together :)</p></div>
          <ul className="mk-formats">{mediaKit.formats.map(format => <li key={format}><span aria-hidden="true">↗</span>{format}</li>)}</ul></div>
      </section>

      <section className="mk-section" aria-labelledby="experience-title">
        <SectionHeading number="05" id="experience-title">Brand experience</SectionHeading>
        <article className="mk-card mk-experience"><div><p className="mk-eyebrow">UNPAID PRODUCT COLLABORATION</p><h3>XP-PEN <span>Product collaboration</span></h3></div><p>XP-PEN sent me a graphics tablet to try out, and I later gave it away to my community. It wasn't a paid partnership: I got to test the product, share it with my audience and organise the giveaway.</p></article>
      </section>

      <section id="contact" className="mk-contact" aria-labelledby="contact-title"><p className="mk-eyebrow">CONTACT</p><h2 id="contact-title">Let's create<br />something together<span>!</span></h2><a className="mk-email" href={`mailto:${mediaKit.email}`}>{mediaKit.email}<ArrowUpRight aria-hidden="true" /></a><SocialLinks /></section>
    </main>
    <footer className="mk-footer mk-container"><a href="/">Astrid Beyer / Teloru</a><span>3D // CODING // GAMES</span><a href="#page-title">Back to top ↑</a></footer>
  </div>;
}
