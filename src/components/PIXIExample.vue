<template>
    <v-row>
        <v-col>
          <v-simple-table>
            <thead>
              <tr>
                <th>Objeto</th>
                <th>Tamaño</th>
                <th>Posición</th>
                <th>Agregar</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Titulo
                </td>
                <td>
                  x,y
                </td>
                <td>
                  w,h
                </td>
                <td>
                  <v-btn class="primary" @click="drawRectangle(0, 0, 180, 30)">Agregar</v-btn>
                </td>
              </tr>
              <tr>
              <td>
                Subtitulo
              </td>
              <td>
                x,y
              </td>
              <td>
                w,h
              </td>
              <td>
                <v-btn class="primary" @click="drawRectangle(10, 20, 50, 30)">Agregar  </v-btn>
              </td>
              </tr>
              <tr>
              <td>
                Imagen
              </td>
              <td>
                x,y
              </td>
              <td>
                w,h
              </td>
              <td>
                <v-btn class="green" @click="drawSprite({posX: 0, posY: 0, w: 200, h: 200})">Agregar</v-btn>

              </td>
              </tr>
              <tr>
              <td>
                Imagen grande
              </td>
              <td>
                x,y
              </td>
              <td>
                w,h
              </td>
              <td>
                <v-btn class="blue" @click="drawRectangle(0, 0, 400, 600)">Agregar  </v-btn>
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