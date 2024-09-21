<template>
    <img :src="pieceImage" alt="chess piece" v-if="piece" class="piece-image" />
</template>

<script>
export default {
    props: {
        piece: {
            type: String,
            default: ''
        }
    },
    computed: {
        pieceImage() {
            // Map de piezas a imágenes
            const pieceMap = {
                'r': '/src/assets/pieces/black-rook.svg',
                'n': '/src/assets/pieces/black-knight.svg',
                'b': '/src/assets/pieces/black-bishop.svg',
                'q': '/src/assets/pieces/black-queen.svg',
                'k': '/src/assets/pieces/black-king.svg',
                'p': '/src/assets/pieces/black-pawn.svg',
                'R': '/src/assets/pieces/white-rook.svg',
                'N': '/src/assets/pieces/white-knight.svg',
                'B': '/src/assets/pieces/white-bishop.svg',
                'Q': '/src/assets/pieces/white-queen.svg',
                'K': '/src/assets/pieces/white-king.svg',
                'P': '/src/assets/pieces/white-pawn.svg'
            };

            return pieceMap[this.piece] || '';
        }
    }
};
</script>

<style>
.piece-image {
    width: 100%;
}
</style>