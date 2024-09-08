import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';

// Math 헬퍼 함수들 (예: clamp, round, adjust)
import { clamp, round, adjust } from '../helpers/Math.js';

const Card = ({
  id = '',
  name = '',
  number = '',
  set = '',
  types = '',
  subtypes = 'basic',
  supertype = 'pokémon',
  rarity = 'common',
  img = '',
  back = 'https://tcg.pokemon.com/assets/img/global/tcg-card-back-2x.jpg',
  foil = '',
  mask = '',
  showcase = false,
}) => {
  const thisCard = useRef(null);
  const [interacting, setInteracting] = useState(false);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(document.visibilityState === 'visible');
  const randomSeed = { x: Math.random(), y: Math.random() };
  const cosmosPosition = { x: Math.floor(randomSeed.x * 734), y: Math.floor(randomSeed.y * 1280) };

  // useSpring for animations
  const [springRotate, setSpringRotate] = useSpring(() => ({ x: 0, y: 0 }));
  const [springGlare, setSpringGlare] = useSpring(() => ({ x: 50, y: 50, o: 0 }));
  const [springBackground, setSpringBackground] = useSpring(() => ({ x: 50, y: 50 }));
  const [springScale, setSpringScale] = useSpring(() => ({ scale: 1 }));

  const activateCard = () => {
    setActive(!active);
  };

  const handleInteract = (e) => {
    const rect = thisCard.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = clamp(round((100 / rect.width) * x));
    const percentY = clamp(round((100 / rect.height) * y));
    const centerX = percentX - 50;
    const centerY = percentY - 50;

    setSpringRotate({
      x: round(-(centerX / 3.5)),
      y: round(centerY / 2),
    });

    setSpringGlare({
      x: round(percentX),
      y: round(percentY),
      o: 1,
    });

    setSpringBackground({
      x: adjust(percentX, 0, 100, 37, 63),
      y: adjust(percentY, 0, 100, 33, 67),
    });

    setInteracting(true);
  };

  const handleEndInteract = () => {
    setSpringRotate({ x: 0, y: 0 });
    setSpringGlare({ x: 50, y: 50, o: 0 });
    setSpringBackground({ x: 50, y: 50 });
    setInteracting(false);
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  useEffect(() => {
    // visibility change listener
    const visibilityChange = () => {
      setIsVisible(document.visibilityState === 'visible');
      handleEndInteract();
    };

    document.addEventListener('visibilitychange', visibilityChange);
    return () => document.removeEventListener('visibilitychange', visibilityChange);
  }, []);

  const staticStyles = `
    --seedx: ${randomSeed.x};
    --seedy: ${randomSeed.y};
    --cosmosbg: ${cosmosPosition.x}px ${cosmosPosition.y}px;
  `;

  return (
    <animated.div
      ref={thisCard}
      className={`card ${types} ${interacting ? 'interacting' : ''} ${loading ? 'loading' : ''}`}
      style={{
        transform: springScale.scale.interpolate((s) => `scale(${s})`),
        '--rotate-x': springRotate.x,
        '--rotate-y': springRotate.y,
        '--pointer-x': springGlare.x,
        '--pointer-y': springGlare.y,
        '--card-opacity': springGlare.o,
      }}
      onMouseMove={handleInteract}
      onMouseLeave={handleEndInteract}
      onClick={activateCard}
    >
      <div className="card__translater">
        <button className="card__rotator">
          <img
            className="card__back"
            src={back}
            alt="The back of a Pokemon Card"
            loading="lazy"
            width="660"
            height="921"
          />
          <div className="card__front" style={{ staticStyles }}>
            <img
              src={img}
              alt={`Front design of the ${name} Pokemon Card`}
              onLoad={handleImageLoad}
              loading="lazy"
              width="660"
              height="921"
            />
            <div className="card__shine"></div>
            <div className="card__glare"></div>
          </div>
        </button>
      </div>
    </animated.div>
  );
};

export default Card;
