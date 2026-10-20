import React, { useState } from 'react';
import { Instagram, ArrowRight, Award, Trophy, Users, Globe, Target } from 'lucide-react';
import { TRANSFORMS as DEFAULT_TRANSFORMS, BRAND as DEFAULT_BRAND } from '../data';
import { SectionHead } from '../components/ui';
import { useContent } from '../context';
import { CTA } from '../components/Sections';

export default function Transformations() {
  const { transforms: dynamicTransforms, brand: dynamicBrand } = useContent();
  const TRANSFORMS = dynamicTransforms || DEFAULT_TRANSFORMS;
  const BRAND = dynamicBrand || DEFAULT_BRAND;

  const [filter, setFilter] = useState('all');

  // Client transformation items with video review availability flag and instagram reel link option
  const CLIENT_STORIES = [
    {
      id: 1,
      name: 'Amit Kumar',
      goal: 'Fat Loss & Abs',
      type: 'fat',
      result: '-12 KG in 4 Months',
      image: '/images/transformations/ba7.png',
      hasVideoReview: true,
      reelLink: 'https://www.instagram.com/trainxshiv/',
      priority: 1,
    },
    {
      id: 2,
      name: 'Sneha Verma',
      goal: 'Fat Loss & Inch Loss',
      type: 'fat',
      result: '-10 KG in 3 Months',
      image: '/images/transformations/ba8.png',
      hasVideoReview: true,
      reelLink: 'https://www.instagram.com/trainxshiv/',
      priority: 2,
    },
    {
      id: 3,
      name: 'Rahul Mehta',
      goal: 'Muscle Building',
      type: 'muscle',
      result: '+8 KG Lean Mass in 5 Months',
      image: '/images/transformations/b9.png',
      hasVideoReview: true,
      reelLink: 'https://www.instagram.com/trainxshiv/',
      priority: 3,
    },
    {
      id: 4,
      name: 'Vikas Yadav',
      goal: 'Fat Loss & Toning',
      type: 'fat',
      result: '-14 KG in 6 Months',
      image: '/images/transformations/b10.png',
      hasVideoReview: true,
      reelLink: 'https://www.instagram.com/trainxshiv/',
      priority: 4,
    },
    {
      id: 5,
      name: 'Arjun Singh',
      goal: 'Body Recomposition',
      type: 'gain',
      result: '+9 KG in 5 Months',
      image: '/images/transformations/ba_2.png',
      hasVideoReview: false,
      reelLink: 'https://www.instagram.com/trainxshiv/',
      priority: 5,
    },
    {
      id: 6,
      name: 'Pooja Sharma',
      goal: 'Women Fitness & Toning',
      type: 'fat',
      result: '-8 KG in 3 Months',
      image: '/images/transformations/ba_3.png',
      hasVideoReview: false,
      reelLink: 'https://www.instagram.com/trainxshiv/',
      priority: 6,
    },
  ];

  const tabs = [
    ['all', 'All Transformations'],
    ['fat', 'Fat Loss'],
    ['muscle', 'Muscle Building'],
    ['gain', 'Weight Gain'],
  ];

  // Prioritize clients who have video reviews available
  const filteredStories = (filter === 'all' ? CLIENT_STORIES : CLIENT_STORIES.filter((t) => t.type === filter))
    .sort((a, b) => (b.hasVideoReview ? 1 : 0) - (a.hasVideoReview ? 1 : 0));

  return (
    <div className="transformations-page">
      {/* Compact Page Hero: Extra gap around heading removed */}
      <section className="page-hero compact-hero">
        <div className="container">
          <span className="pill">Transformation Stories</span>
          <h1>
            Fitness Journeys. <span className="text-yellow">Stronger Results.</span>
          </h1>
          <p>Real verified natural transformations achieved by TrainXShiv clients across India.</p>
        </div>
      </section>

      {/* Real People, Real Results Section with Stats directly under hero */}
      <section className="section tight zero-top-spacing">
        <div className="container">
          <div className="transform-stats-banner card no-tilt">
            <div className="tstat-head">
              <span className="pill cert-pill">Real Transformations</span>
              <h2>
                Real People. <span className="text-yellow">Real Results.</span>
              </h2>
              <p>100% natural, verified results from TrainXShiv clients across India.</p>
            </div>

            <div className="tstat-numbers-row">
              <div className="tstat-item">
                <Users size={22} className="text-yellow" />
                <div>
                  <strong>500+</strong>
                  <span>Happy Clients</span>
                </div>
              </div>
              <div className="tstat-divider" />
              <div className="tstat-item">
                <Globe size={22} className="text-yellow" />
                <div>
                  <strong>8+</strong>
                  <span>Countries</span>
                </div>
              </div>
              <div className="tstat-divider" />
              <div className="tstat-item">
                <Target size={22} className="text-yellow" />
                <div>
                  <strong>100%</strong>
                  <span>Success Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Transformation Photos Grid with Watch Story Buttons */}
      <section className="section">
        <div className="container">
          {/* Category Filter Chips */}
          <div className="chips transform-chips reveal">
            {tabs.map(([k, l]) => (
              <button
                key={k}
                className={`chip ${filter === k ? 'on' : ''}`}
                onClick={() => setFilter(k)}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Pure Photo Cards Grid (No Heavy Video Files - Ultra Fast Loading) */}
          <div className="grid g3 stagger reveal transform-grid" key={filter}>
            {filteredStories.map((client) => (
              <article key={client.id} className="card client-story-card">
                {/* Photo Stage */}
                <div className="client-story-img-wrap">
                  <img
                    src={client.image}
                    alt={`${client.name} Transformation`}
                    loading="lazy"
                  />
                  {client.hasVideoReview && (
                    <span className="video-story-badge">
                      🎥 Video Review Available
                    </span>
                  )}
                </div>

                {/* Card Info & Watch Story Button */}
                <div className="client-story-body">
                  <div className="client-story-meta">
                    <h3 className="client-story-name">{client.name}</h3>
                    <div className="client-story-result">{client.result}</div>
                  </div>

                  <p className="client-story-goal">Goal: {client.goal}</p>

                  {/* Watch Story Action Button connecting Instagram Reel */}
                  <a
                    href={client.reelLink || BRAND.instagram || 'https://www.instagram.com/trainxshiv/'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-client-story-watch"
                  >
                    <Instagram size={15} />
                    <span>Watch Story</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
}
