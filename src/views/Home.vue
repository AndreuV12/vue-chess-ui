<template>
  <div>

    <h1>Home Page</h1>
    <v-select></v-select>
    <Board></Board>
  </div>
</template>

<script>
import Board from '../components/Board/Board.vue';
export default {
  components: {
    Board
  },
  name: 'Home',
};
</script>
