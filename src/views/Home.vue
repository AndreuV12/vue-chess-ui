<template>
  <div>
    <h1>Home</h1>
    <Board style="width: 600px;"></Board>
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
