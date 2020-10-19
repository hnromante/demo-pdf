<template>
    <v-row>
        <v-col>
            <v-btn class="primary" @click="drawRectangle(0, 0, 180, 30)">Agregar Titulo (180x30)</v-btn>
            <v-spacer></v-spacer>
            <v-btn class="secondary" @click="drawRectangle(0, 0, 40, 10)">Agregar Subtitulo (40x10)</v-btn>
            <v-spacer></v-spacer>
            <v-btn class="green" @click="drawSprite">Agregar Imagen (200x200)</v-btn>
            <v-spacer></v-spacer>
            <v-btn class="blue" @click="drawRectangle(0, 0, 400, 600)">Agregar Imagen grande(400x600)</v-btn>
        </v-col>
        <v-col>
            <v-container class="grid-container">
                <canvas ref="grid"></canvas>
            </v-container>
        </v-col>
    </v-row>
</template>
<script>
import * as PIXI from "pixi.js/dist/pixi";
  export default {
    name: "PIXIExample",
    data() {
      return {
        canvasW: 800,
        canvasH: 1200,
        step: 10,
        canvas: null,
        pixiApp: null,
        graphics: []
      }
    },
    mounted() {
      this.setupPixi();
    },
    methods: {
      setupPixi() {
        const Application = PIXI.Application,
          loader = PIXI.loader;
        this.canvas =  this.$refs.grid;;
        this.pixiApp =  new Application({
          width: this.canvasW,
          height: this.canvasH,
          view: this.canvas,
          backgroundColor: '0x1099bb'
        })
        loader.add('../assets/logo.png')
        this.setCanvasSize(this.canvas, this.canvasW, this.canvasH);
        this.drawGrid( this.canvasW, this.canvasH, this.step)
      },
      drawRectangle(posX ,posY, w, h) {
        const graphics = new PIXI.Graphics()
        graphics.lineStyle(2, '#22aabb')
        graphics.moveTo(posX, posY)
        graphics.lineTo(posX+w, posY)
        graphics.lineTo(posX+w, posY+h)
        graphics.lineTo(posX, posY+h)
        graphics.lineTo(posX, posY)
        this.graphics.push(graphics)
        this.pixiApp.stage.addChild(graphics)
      },
      setCanvasSize(canvas, w, h) {
        canvas.width  = w;
        canvas.height = h;
      },
      drawGrid( w, h, step) {
        const graphics = new PIXI.Graphics()
        graphics.lineStyle(1, 0x000000)
        for (let x=0;x<=w;x+=step) {
          graphics.moveTo(x, 0);
          graphics.lineTo(x, h);
        }
        for (let y=0;y<=h;y+=step) {
          graphics.moveTo(0, y);
          graphics.lineTo(w, y);
        }
        this.graphics.push(graphics)
        this.pixiApp.stage.addChild(graphics)
      },
      drawSprite() {
        const cat = new PIXI.Sprite(PIXI.Loader.shared["images/cat.png"].texture);
        //Add the cat to the stage
        this.pixiApp.stage.addChild(cat);
      }
    },

  }
</script>

<style scoped>

</style>