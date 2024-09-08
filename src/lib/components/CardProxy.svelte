<script>
  import altArts from "./alternate-arts.json";
  import promos from "./promos.json";
	import Card from "./Card.svelte";

  // data / pokemon props
  export let id = undefined;
  export let name = undefined;
  export let number = undefined;
  export let set = undefined;
  export let types = undefined;
  export let subtypes = undefined;
  export let supertype = undefined;
  export let rarity = undefined;

  // image props
  export let img = undefined;
  export let back = undefined;
  export let foil = undefined;
  export let mask = undefined;

  // context/environment props
  export let showcase = false;

  function isDefined (v) {
    return typeof v !== "undefined" && v !== null;
  }

  function cardImage () {
    if ( isDefined( img ) ) {
      return img;
    }
    if ( isDefined( set ) && isDefined( number ) ) {
      // return `https://images.pokemontcg.io/${ set.toLowerCase() }/${ number }_hires.png`;
      // return `http://localhost:5173/img/monster/housekeeper.png`;
      return `http://localhost:5173/img/monster/${ set.toLowerCase() }${ number }.png`;
    }
    return "";
  }

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
    showcase

  }

</script>





<Card {...proxy} />
