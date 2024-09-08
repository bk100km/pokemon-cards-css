import React, { useState, useEffect } from 'react';
import CardList from './Cards'; // CardList 컴포넌트
import Card from './lib/components/CardProxy'; // Card 컴포넌트

const Inventory = () => {
  const [amazings, setAmazings] = useState([]); // 카드 데이터를 저장할 상태
  const [query, setQuery] = useState(''); // 검색어 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [isInventoryOpen, setIsInventoryOpen] = useState(false); // 인벤토리 열림/닫힘 상태 관리

  // 카드 데이터를 가져오는 비동기 함수
  const getCards = async () => {
    const response = await fetch('/data/cards.json');
    const cards = await response.json();
    return cards;
  };

  // 카드 데이터를 로드하는 함수
  const loadCards = async () => {
    const cards = await getCards();
    setAmazings(cards.slice(0, 9)); // 처음 9개의 카드를 amazings 상태에 저장
    setIsLoading(false); // 로딩 완료
  };

  // 컴포넌트가 처음 마운트될 때 카드 데이터를 로드
  useEffect(() => {
    loadCards();
  }, []);

  // 인벤토리 열림/닫힘 상태를 전환하는 함수
  const toggleInventory = () => {
    setIsInventoryOpen(!isInventoryOpen); // 열림/닫힘 상태 토글
  };

  return (
    <main>
      {/* 가방 버튼 */}
      <button className="inventory-toggle" onClick={toggleInventory}>
        {isInventoryOpen ? '가방 닫기' : '가방 열기'}
      </button>

      {/* 인벤토리 보여주기 */}
      {isInventoryOpen && query.length < 3 && (
        <>
          <h1 id="⚓-amazing">몬스터 인벤토리</h1>

          <CardList>
            {isLoading ? (
              <p>loading...</p>
            ) : (
              amazings.map((card) => (
                <Card
                  key={card.id} // React에서는 리스트 아이템에 고유 key가 필요
                  id={card.id}
                  name={card.name}
                  number={card.number}
                  set={card.set}
                  types={card.types}
                  supertype={card.supertype}
                  subtypes={card.subtypes}
                  rarity={card.rarity}
                />
              ))
            )}
          </CardList>
        </>
      )}
    </main>
  );
};

export default Inventory;
