<template>
    <v-row>
        <v-col>
          <v-simple-table>
            <thead>
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
                <v-btn class="green" @click="drawSprite({posX: dimentions.image.posX, posY: dimentions.image.posY, w: dimentions.image.w, h: dimentions.image.h})">Agregar</v-btn>

              </td>
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
  export default {
    name: "PIXIExample",
    data() {
      return {
        canvasW: 800,
        canvasH: 1200,
        step: 100,
        canvas: null,
        pixiApp: null,
        graphics: [],
        dimentions: {
          title: {posX: 400, posY: 600, w: 120, h: 40},
          image: {posX: 400, posY: 400, w: 100, h: 200},
        }
      }
    },
    mounted() {
      this.setupPixi();
    },
    methods: {
      setupPixi() {
        const Application = PIXI.Application,
          loader = PIXI.loader;
        this.canvas =  this.$refs.grid;
        this.pixiApp =  new Application({
          width: this.canvasW,
          height: this.canvasH,
          view: this.canvas,
          transparent: true,
        })
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
      drawSprite({posX ,posY, w, h, url='https://lh3.googleusercontent.com/proxy/XiV7ivyfCm6dL7pDE_pS9ZOctLDcbY2c8seMqtcJ0M1NMmJ7bVKOfTcmafl9-ov2YJPofBbPlAg7M-BXGpTcMfgyuCZMpCcctnhrMN37QAL0YRk-rEk'}) {
        const hawaii = PIXI.Sprite.from(url);
        hawaii.anchor.x = 0.0;
        hawaii.anchor.y = 0.0;
        hawaii.position.x = posX;
        hawaii.position.y = posY;
        hawaii.width = w;
        hawaii.height = h;
        this.pixiApp.stage.addChild(hawaii);
      }
    },

  }
</script>

<style scoped>

</style>