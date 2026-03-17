import { MARQUEE_ITEMS } from '../../../constants/data';

const Diamond = () => (
  <span className="marquee-band__diamond" aria-hidden="true">
    <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor">
      <rect x="3" y="0" width="4.24" height="4.24" rx="0.5" transform="rotate(45 3 0)" />
    </svg>
  </span>
);

const MarqueeRow = ({ items, reverse = false }) => {
  const tripled = [...items, ...items, ...items];

  return (
    <div className={`marquee-band__row ${reverse ? 'marquee-band__row--reverse' : ''}`}>
      <div className="marquee-band__track">
        {tripled.map((item, i) => (
          <div key={`${item}-${i}`} className="marquee-band__item">
            <Diamond />
            <span className="marquee-band__text">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const MarqueeBand = () => (
  <div className="marquee-band">
    <div className="marquee-band__fade marquee-band__fade--left" />
    <div className="marquee-band__fade marquee-band__fade--right" />
    <MarqueeRow items={MARQUEE_ITEMS} />
    <MarqueeRow items={MARQUEE_ITEMS} reverse />
  </div>
);

export default MarqueeBand;
