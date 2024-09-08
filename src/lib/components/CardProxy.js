import React from 'react';
import altArts from './alternate-arts.json';
import promos from './promos.json';
import Card from './Card';

const CardProxy = ({
  id = undefined,
  name = undefined,
  number = undefined,
  set = undefined,
  types = undefined,
  subtypes = undefined,
  supertype = undefined,
  rarity = undefined,
  img = undefined,
  back = undefined,
  foil = undefined,
  mask = undefined,
  showcase = false,
}) => {
  // 유효한 값인지 확인하는 함수
  const isDefined = (v) => typeof v !== 'undefined' && v !== null;

  // 카드 이미지를 반환하는 함수
  const cardImage = () => {
    if (isDefined(img)) {
      return img;
    }
    if (isDefined(set) && isDefined(number)) {
      return `http://localhost:5173/img/monster/${set.toLowerCase()}${number}.png`;
    }
    return '';
  };

  // 카드 데이터를 props로 정리
  const proxy = {
    img: cardImage(),
    back,
    id,
    name,
    number,
    set,
    types,
    subtypes,
    supertype,
    rarity,
    showcase,
  };

  // Card 컴포넌트를 호출하며 proxy props 전달
  return <Card {...proxy} />;
};

export default CardProxy;
