<template>
    <section>
        <img v-if="!showPokemon" class="brightness-0 h-[200px] " :src="pokemonImage" />
        <img v-else class="h-[200px]  fade-in" :src="pokemonImage" alt="pokemon " />

    </section>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

interface Props {
    pokemonId: number;
    showPokemon?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    showPokemon: false
});


const pokemonImage = computed(() => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.pokemonId}.svg`;
});

</script>

<style scoped>
img {
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
}
</style>