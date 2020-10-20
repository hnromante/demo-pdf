<template>
    <v-row>
        <v-col>
          <v-simple-table>
            <thead>
              <tr>
                <td colspan="4"><h3>Canvas Objects</h3></td>
              </tr>
              <tr>
                <th>Objeto</th>
                <th>Posición</th>
                <th>Tamaño</th>
                <th>Agregar</th>
              </tr>
            </thead>
            <tbody>
            <tr>
              <td>Titulo</td>
              <td>
                <v-text-field v-model="dimentions.title.posX" label="x"></v-text-field>
                <v-text-field v-model="dimentions.title.posY" label="y"></v-text-field>
              </td>
              <td>
                <v-text-field v-model="dimentions.title.w" label="w"></v-text-field>
                <v-text-field v-model="dimentions.title.h" label="h"></v-text-field>
              </td>
              <td>
                <v-btn class="primary" @click="alert('draw title')">Agregar</v-btn>
              </td>
            </tr>
              <tr>
                <td>Rectangulo</td>
                <td>
                  <v-text-field v-model="dimentions.title.posX" label="x"></v-text-field>
                  <v-text-field v-model="dimentions.title.posY" label="y"></v-text-field>
                </td>
                <td>
                  <v-text-field v-model="dimentions.title.w" label="w"></v-text-field>
                  <v-text-field v-model="dimentions.title.h" label="h"></v-text-field>
                </td>
                <td>
                  <v-btn class="primary" @click="drawRectangle(dimentions.title.posX, dimentions.title.posY, dimentions.title.w, dimentions.title.h)">Agregar</v-btn>
                </td>
              </tr>
              <tr>
              <td>
                Imagen
              </td>
                <td>
                  <v-text-field v-model="dimentions.image.posX" label="x"></v-text-field>
                  <v-text-field v-model="dimentions.image.posY" label="y"></v-text-field>
                </td>
                <td>
                  <v-text-field v-model="dimentions.image.w" label="w"></v-text-field>
                  <v-text-field v-model="dimentions.image.h" label="h"></v-text-field>
                </td>
              <td>
                <v-btn class="green"
                       @click="drawSprite({
                       posX: dimentions.image.posX,
                       posY: dimentions.image.posY,
                       w: dimentions.image.w,
                       h: dimentions.image.h,
                       path: '../assets/logo.png'})">
                  Agregar
                </v-btn>

              </td>
              </tr>
              <tr>
                <td colspan="4"><h3>Canvas settings</h3></td>
              </tr>
              <tr>
                <td colspan="2">
                  <v-text-field label="Canvas width" v-model="canvasW"></v-text-field>
                  <v-text-field label="Canvas heigth" v-model="canvasH"></v-text-field>
                </td>
                <td>
                  <v-text-field label="Step" v-model="step"></v-text-field>
                  <v-switch v-model="grid" label="Grid ON/OFF"></v-switch>
                </td>
                <td ><v-btn color="primary" @click="applyCanvasSettings">Apply  </v-btn></td>
              </tr>
            <tr>
              <td colspan="4"><h3>Acciones</h3></td>
            </tr>
            <tr>
              <td colspan="1"><v-btn @click="alert('generar PDF')">Generar PDF</v-btn></td>
              <td colspan="1"><v-btn @click="alert('generar PDF')">Reordenar</v-btn></td>
              <td colspan="2"><v-btn @click="alert('generar JSON')">Generar Representacion JSON</v-btn></td>
            </tr>
            </tbody>
          </v-simple-table>
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
import image from '../assets/logo.png'
  export default {
    name: "PIXIExample",
    data() {
      return {
        canvasW: 800,
        canvasH: 1200,
        step: 100,
        grid: true,
        canvas: null,
        pixiApp: null,
        graphics: new Map(),
        sprites: new Map(),
        dimentions: {
          title: {posX: 400, posY: 600, w: 120, h: 40},
          image: {posX: 400, posY: 400, w: 100, h: 200},
        },
      }
    },
    mounted() {
      this.setupPixi();
    },
    methods: {
      setupPixi() {
        const Application = PIXI.Application;
        this.canvas =  this.$refs.grid;
        this.pixiApp =  new Application({
          width: this.canvasW,
          height: this.canvasH,
          view: this.canvas,
          transparent: true,
        })
        this.setCanvasSize();
        this.drawGrid()
      },
      drawRectangle(posX ,posY, w, h) {
        posY = Number(posY)
        posX = Number(posX)
        w = Number(w)
        h = Number(h)
        const graphics = new PIXI.Graphics()
        graphics.lineStyle(2, '#22aabb')
        graphics.moveTo(posX, posY)
        graphics.lineTo(posX+w, posY)
        graphics.lineTo(posX+w, posY+h)
        graphics.lineTo(posX, posY+h)
        graphics.lineTo(posX, posY)
        this.pixiApp.stage.addChild(graphics)
      },
      setCanvasSize() {
        this.canvas.width  = Number(this.canvasW);
        this.canvas.height = Number(this.canvasH);
      },
      drawGrid( ) {
        const graphics = new PIXI.Graphics()
        graphics.lineStyle(1, 0x000000)
        for (let x=0;x<=this.canvasW;x+=Number(this.step)) {
          graphics.moveTo(x, 0);
          graphics.lineTo(x, this.canvasH);
        }
        for (let y=0;y<=this.canvasH;y+=Number(this.step)) {
          graphics.moveTo(0, y);
          graphics.lineTo(this.canvasH, y);
        }
        this.graphics.set('grid', graphics)
        this.pixiApp.stage.addChild(graphics)
      },
      drawSprite({posX ,posY, w, h, path='../assets/logo.png'}) {
        const sprite = PIXI.Sprite.from(image);
        posY = Number(posY)
        posX = Number(posX)
        w = Number(w)
        h = Number(h)
        sprite.anchor.x = 0.0;
        sprite.anchor.y = 0.0;
        sprite.position.x = posX;
        sprite.position.y = posY;
        sprite.width = w;
        sprite.height = h;
        this.sprites.set(Math.random(), sprite)
        this.pixiApp.stage.addChild( sprite);
      },
      applyCanvasSettings(){
        this.pixiApp.stage.removeChild(this.graphics.get('grid'))
        this.setCanvasSize();
        this.toggleGrid();
      },
      toggleGrid () {
        if (this.grid) {
          this.drawGrid()
        }else {
          this.pixiApp.stage.removeChild(this.graphics.get('grid'))
        }
      },

    },

  }
</script>

<style scoped>

</style>