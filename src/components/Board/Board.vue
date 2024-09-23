<template>
  <div class="borderedBoard d-flex justify-center align-center">
    <div class="board">
      <div v-for="(coor, index) in coorditates" :key="coor" @click.stop="handleClick(coor)"
        :class="['cell', isBlackCell(index) ? 'black-cell' : 'white-cell']">
        <Piece :piece="pieces[coor]" :selected="coor == selectedCoor"></Piece>
      </div>
    </div>
  </div>

</template>

<script>
import Piece from './Piece/Piece.vue';
import ChessEngine from '../../services/ChessEngine';

export default {
  name: 'Board',
  components: {
    Piece,
  },
  props: {
    fen: {
      type: String,
      default: () => "8/8/8/8/8/8/8/8 w KQkq - 0 1"
    },
    selectedCoor: {
      type: String,
    }
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
      return ChessEngine.getPieces(this.fen)
    },
  },
  methods: {
    isBlackCell(index) {
      const row = Math.floor(index / 8);
      const col = index % 8;
      return (row + col) % 2 !== 0;
    },

    handleClick(coor) {
      this.$emit('onClick', coor)
    }
  },
}
</script>

<style scoped>
.borderedBoard {
  aspect-ratio: 1;
  background-color: black;
  max-width: 100%;
  max-height: 100%;
}

.board {
  width: 96%;
  height: 96%;
  display: flex;
  flex-wrap: wrap;

}

.cell {
  width: 12.5%;
  height: 12.5%;
  cursor: pointer;
}

.cell.white-cell {
  background-color: white;
}

.cell.black-cell {
  background-color: grey;
}
</style>