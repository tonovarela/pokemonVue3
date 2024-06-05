<template>
    <section class="mt-5">
        <ul v-for="{ id, name } of options" :key="id">

            <li @click="checkAnswer(id)" :class="['capitalize', {
                enabled: !blockSelection,
                disabled: blockSelection,
                correct: id === correctAnswer && blockSelection,
                wrong: id !== correctAnswer && blockSelection
            }]">
                {{ name }}
            </li>


        </ul>
    </section>
</template>

<script setup lang="ts">

import { Pokemon } from '../interfaces/pokemon-interface';


interface Props {
    options: Pokemon[];
    blockSelection: boolean;
    correctAnswer: number;
};
const props = defineProps<Props>();
const emit = defineEmits<{ selectedOptions: [id: number] }>();

const checkAnswer = (id: number) => {
    if (props.blockSelection) return;
    emit('selectedOption', id);

}


</script>
<style scoped>
.enabled {
    @apply bg-white shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-100
}

.disabled {
    @apply bg-gray-400 text-gray-600 shadow-md rounded-lg p-3 m-2 cursor-not-allowed w-40 text-center
}

.correct {
    @apply bg-blue-500 text-white
}

.wrong {
    @apply bg-red-200 text-white
}
</style>
