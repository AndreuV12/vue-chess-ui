<template>
    <div style="position: relative; width: 100%; height: 100%;">
        <div v-if="selected" class="piece-background"></div>
        <img :src="pieceImage" alt="chess piece" v-if="piece" class="piece-image" />
    </div>
</template>

<script>
export default {
    props: {
        piece: {
            type: String,
            default: ''
        },
        selected: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        pieceImage() {
            // Map de piezas a imágenes
            const pieceMap = {
                'r': '/pieces/black-rook.svg',
                'n': '/pieces/black-knight.svg',
                'b': '/pieces/black-bishop.svg',
                'q': '/pieces/black-queen.svg',
                'k': '/pieces/black-king.svg',
                'p': '/pieces/black-pawn.svg',
                'R': '/pieces/white-rook.svg',
                'N': '/pieces/white-knight.svg',
                'B': '/pieces/white-bishop.svg',
                'Q': '/pieces/white-queen.svg',
                'K': '/pieces/white-king.svg',
                'P': '/pieces/white-pawn.svg'
            };

            return pieceMap[this.piece] || '';
        }
    }
};
</script>

<style>
.piece-image {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 4;
}

.piece-background {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
    background-color: rgba(121, 145, 105, 0.55);
}
</style>