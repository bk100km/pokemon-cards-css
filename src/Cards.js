import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';

const CardComponent = ({
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
  const [loading, setLoading] = useState(true);
  const [interacting, setInteracting] = useState(false);
  const [active, setActive] = useState(false);

  // Springs for animations
  const [springProps, setSpringProps] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    config: { tension: 200, friction: 50 },
  }));

  const handleInteract = (e) => {
    setInteracting(true);
    const rect = thisCard.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setSpringProps({
      rotateX: x / 50,
      rotateY: y / 50,
      scale: 1.05,
    });
  };

  const handleEndInteract = () => {
    setInteracting(false);
    setSpringProps({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
    });
  };

  const activateCard = () => {
    setActive(!active);
  };

  useEffect(() => {
    if (showcase) {
      // Example showcase animation using interval
      const interval = setInterval(() => {
        setSpringProps({
          rotateX: Math.random() * 50 - 25,
          rotateY: Math.random() * 50 - 25,
          scale: 1.1,
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [showcase, setSpringProps]);

  const handleImageLoad = () => setLoading(false);

  return (
    <animated.div
      ref={thisCard}
      className={`card ${types} ${interacting ? 'interacting' : ''} ${loading ? 'loading' : ''}`}
      style={{
        transform: springProps.scale.interpolate(
          (scale) => `scale(${scale}) rotateX(${springProps.rotateX}deg) rotateY(${springProps.rotateY}deg)`
        ),
      }}
    >
      <div className="card__translater">
        <button
          className="card__rotator"
          onClick={activateCard}
          onMouseMove={handleInteract}
          onMouseOut={handleEndInteract}
        >
          <img
            className="card__back"
            src={back}
            alt="The back of a Pokemon Card"
            loading="lazy"
            width="660"
            height="921"
          />
          <div className="card__front">
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

export default CardComponent;
