import { computed, onMounted, ref } from 'vue';
import { GameStatus, type PokemonResponse, type Pokemon } from '../interfaces';

import confetti from 'canvas-confetti';
import { pokemonApi } from '@/api/pokemonApi';

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.PLAYING);
  const pokemons = ref<Pokemon[]>([]);
  const pokemonOptions = ref<Pokemon[]>([]);
  const randomPokemon = computed(() => {
    return pokemonOptions.value[Math.floor(Math.random() * pokemonOptions.value.length)];
  });
  const isLoading = computed(() => pokemons.value.length === 0);

  const getPokemons = async (): Promise<Pokemon[]> => {
    const response = await pokemonApi.get<PokemonResponse>('/?limit=151');
    const pokemonList = response.data.results.map((pokemon) => {
      const urlPart = pokemon.url.split('/');
      const id = urlPart.at(-2) ?? 0;
      return { name: pokemon.name, id: +id };
    });
    return pokemonList.sort(() => Math.random() - 0.5);
  };

  const getNextRound = (howMany: number = 4) => {
    gameStatus.value = GameStatus.PLAYING;
    pokemonOptions.value = pokemons.value.slice(0, howMany);
    pokemons.value = pokemons.value.slice(howMany);
  };

  const checkAnswer = (id: number) => {
    const hasWon = randomPokemon.value.id === id;
    gameStatus.value = hasWon ? GameStatus.WIN : GameStatus.LOST;
    if (gameStatus.value === GameStatus.WIN) {
      confetti({
        particleCount: 300,
        spread: 150,
        origin: { y: 0.6 },
      });
    }
  };

  onMounted(async () => {
    //await new Promise((resolve) => setTimeout(resolve, 1000));
    pokemons.value = await getPokemons();
    getNextRound(4);
  });

  return {
    gameStatus,
    isLoading,
    randomPokemon,
    pokemonOptions,

    checkAnswer,
    getNextRound,
  };
};
