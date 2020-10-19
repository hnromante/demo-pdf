<template>
    <v-row>
        <v-col>
            <v-btn class="primary" @click="drawRectangle(0, 0, 180, 30)">Agregar Titulo (180x30)</v-btn>
            <v-spacer></v-spacer>
            <v-btn class="secondary" @click="drawRectangle(0, 0, 40, 10)">Agregar Subtitulo (40x10)</v-btn>
            <v-spacer></v-spacer>
            <v-btn class="green" @click="drawRectangle(0, 0, 200, 200)">Agregar Imagen (200x200)</v-btn>
            <v-spacer></v-spacer>
            <v-btn class="green" @click="drawRectangle(0, 0, 400, 600)">Agregar Imagen grande(400x600)</v-btn>
            <v-spacer></v-spacer>
            <v-btn class="primary" @click="alert('organizar')">Organizar</v-btn>
            <v-spacer></v-spacer>
            <v-btn class="warning" @click="clean">Limpiar</v-btn>
        </v-col>
        <v-col>
            <v-container class="grid-container">
                <canvas ref="grid"></canvas>
            </v-container>
        </v-col>
    </v-row>

</template>
<script>
  export default {
    name: "CanvasGrid",
    data() {
      return {
        context: null,
        canvasW: 800,
        canvasH: 1200,
        step: 10,
        canvas: null
      }
    },

    mounted() {
      this.canvas =  this.$refs.grid;;
      this.context = this.canvas.getContext('2d');;
      this.setCanvasSize(this.canvas, this.canvasW, this.canvasH);
      this.drawGrid( this.canvasW, this.canvasH, this.step)
    },
    methods: {
      drawRectangle(posX ,posY, w, h) {
        const ctx = this.context;
        ctx.beginPath();
        for (let x=posX;x<=w;x+=1) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
        }
        ctx.strokeStyle = 'rgb(255,0,0)';
        ctx.lineWidth = 0.1;
        ctx.stroke();
      },
      drawGrid( w, h, step) {
        const ctx = this.context;
        ctx.beginPath();
        for (let x=0;x<=w;x+=step) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
        }
        ctx.strokeStyle = 'rgb(255,0,0)';
        ctx.lineWidth = 0.1;
        ctx.stroke();


        ctx.beginPath();
        for (let y=0;y<=h;y+=step) {
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
        }
        // set the color of the line
        ctx.strokeStyle = 'rgb(20,20,20)';
        // just for fun
        ctx.lineWidth = 0.1;
        // for your original question - you need to stroke only once
        ctx.stroke();
      },
      clean() {
        this.context.clearRect(0, 0, this.canvasW, this.canvasH)
        this.drawGrid( this.canvasW, this.canvasH, this.step)
      },
      setCanvasSize(canvas, w, h) {
        canvas.width  = w;
        canvas.height = h;
      }
    }
  }
</script>

<style scoped>

</style>