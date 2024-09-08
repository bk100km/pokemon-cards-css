<script>
  import { onMount } from "svelte";
  import Search from "./Search.svelte";
  import CardList from "./Cards.svelte";
  import Card from "./lib/components/CardProxy.svelte";

  let amazings;
  let query = "";
  let isLoading = true;
  let isInventoryOpen = false; // 인벤토리 열림/닫힘 상태 관리

  const getCards = async () => {
    let cardFetch = await fetch("/data/cards.json");
    let cards = await cardFetch.json();
    return cards;
  };

  const loadCards = async () => {
    return getCards()
      .then((cards) => {
        window.cards = cards;
        amazings = cards.slice(0, 9);
        isLoading = false;
      });
  };

  onMount(() => {
    loadCards();
  });

  // 인벤토리 열림/닫힘 상태를 전환하는 함수
  const toggleInventory = () => {
    isInventoryOpen = !isInventoryOpen;
  };
</script>

<main>
  <!-- 가방 버튼 -->
  <button class="inventory-toggle" on:click={toggleInventory}>
    {isInventoryOpen ? "가방 닫기" : "가방 열기"}
  </button>

  <!-- 인벤토리 보여주기 -->
  {#if isInventoryOpen && query.length < 3}
    <h1 id="⚓-amazing">몬스터 인벤토리</h1>

    <CardList>
      {#if isLoading}
        loading...
      {:else}
        {#each amazings as card, index}
          <Card
            id={card.id}
            name={card.name}
            number={card.number}
            set={card.set}
            types={card.types}
            supertype={card.supertype}
            subtypes={card.subtypes}
            rarity={card.rarity}
          />
        {/each}
      {/if}
    </CardList>
  {/if}
</main>

<style>
  /* 가방 버튼을 좌측 하단에 배치 */
  .inventory-toggle {
    position: fixed;
    bottom: 20px;
    left: 20px;
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    z-index: 1000; /* 다른 요소보다 위에 보이도록 */
  }

  .inventory-toggle:hover {
    background-color: #45a049;
  }
</style>
