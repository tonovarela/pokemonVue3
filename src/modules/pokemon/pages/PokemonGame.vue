<template>
    <section v-if="isLoading || randomPokemon.id === null"
        class=" flex flex-col justify-center items-center w-screen h-screen">
        <h1 class="text-3xl">Espere por favor</h1>
        <h3 class="animate-pulse">Cargando pokemons</h3>
    </section>

    <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
        <h1 class="m-5">Quien es este pokemon?</h1>
        <h1 class="capitalize text-3xl">{{ gameStatus }}</h1>



        <PokemonPicture :pokemon-id="randomPokemon.id" :showPokemon="gameStatus !== GameStatus.PLAYING" />
        <GameOptions :correctAnswer="randomPokemon.id" :block-selection="gameStatus !== GameStatus.PLAYING"
            :options="options" @selected-option="checkAnswer" />

        <button class="border bg-gray-500 p-2  text-white rounded-md mt-5" @click="getNextRound()"
            v-if="gameStatus !== GameStatus.PLAYING">De nuevo</button>


    </section>

</template>

<script setup lang="ts">
import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue'
import GameOptions from '@/modules/pokemon/components/GameOptions.vue'
import { GameStatus } from '../interfaces/game-status.enum';
import { usePokemonGame } from '../composables/usePokemonGame';



const { isLoading, gameStatus, randomPokemon, pokemonOptions: options, checkAnswer, getNextRound } = usePokemonGame();

</script>
