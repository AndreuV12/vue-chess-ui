<template>
  <div class="board">
    <div v-for="(coor, index) in coorditates" :key="coor" @click.stop="handleClick(coor)"
      :class="['cell', isBlackCell(index) ? 'black-cell' : 'white-cell']">
      <Piece :piece="pieces[coor]"></Piece>
    </div>
  </div>
</template>

<script>
import Piece from './Piece/Piece.vue';
import ChessEngine from '../../services/ChessEngine';

export default {
  components: {
    Piece,
  },
  props: {
    modelValue: {
      type: String,
      default: () => "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    },
  },
  data() {
    return {
      coorditates: [
        "A8", "B8", "C8", "D8", "E8", "F8", "G8", "H8",
        "A7", "B7", "C7", "D7", "E7", "F7", "G7", "H7",
        "A6", "B6", "C6", "D6", "E6", "F6", "G6", "H6",
        "A5", "B5", "C5", "D5", "E5", "F5", "G5", "H5",
        "A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4",
        "A3", "B3", "C3", "D3", "E3", "F3", "G3", "H3",
        "A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2",
        "A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1",
      ]
    };
  },
  computed: {
    pieces() {
      return ChessEngine.getPieces(this.modelValue)
    },
    moves() {
      return ChessEngine.getMoves(this.modelValue)
    },
  },
  methods: {
    isBlackCell(index) {
      const row = Math.floor(index / 8);
      const col = index % 8;
      return (row + col) % 2 !== 0;
    },

    handleClick(coor) {
      console.log(coor);
    }
  },
}
</script>

<style scoped>
.board {
  border: 16px solid brown;
  width: 500px;
  height: 500px;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}

.cell {
  box-sizing: border-box;
  width: 12.5%;
  height: 12.5%;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.cell.black-cell {
  background-color: grey;
}
</style>