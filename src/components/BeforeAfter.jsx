import React, { useState } from 'react';
import { MoveHorizontal } from 'lucide-react';
import { Img } from './ui';

export default function BeforeAfter({ t, dark }) {
  const [pos, setPos] = useState(50);
  const isSingleCard = t.image || t.baImage || (!t.before && t.after);
  const singleSrc = t.image || t.baImage || t.after;

  return (
    <div className={`card ba no-tilt ${dark ? 'ba-dark' : ''}`}>
      <div className="ba-stage">
        {isSingleCard ? (
          <>
            <img
              src={singleSrc}
              className="ba-img ba-img-contain"
              alt={`${t.name} Transformation Before & After`}
            />
            <span className="ba-tag l">Before</span>
            <span className="ba-tag r">After</span>
          </>
        ) : (
          <>
            <Img src={t.after} className="ba-img" alt={`${t.name} after`} label="AFTER" />
            <div className="ba-before" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
              <Img src={t.before} className="ba-img" alt={`${t.name} before`} label="BEFORE" />
            </div>
            <div className="ba-line" style={{ left: pos + '%' }}>
              <span><MoveHorizontal size={16} /></span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={pos}
              onChange={(e) => setPos(+e.target.value)}
              className="ba-range"
              aria-label={`Compare ${t.name} before and after`}
            />
            <span className="ba-tag l">Before</span>
            <span className="ba-tag r">After</span>
          </>
        )}
        <div className="ba-result">
          <b>{t.result}</b>
          <small>{t.period}</small>
        </div>
      </div>
      <div className="ba-meta">
        <strong>{t.name}</strong>
        <span>{t.goal}</span>
      </div>
    </div>
  );
}
