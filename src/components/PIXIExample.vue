<template>
    <v-row>
        <v-col cols="7">
          <v-row>
            <v-col>
              <v-simple-table>
                <thead>
                <tr>
                  <th colspan="4"><h3>Canvas Objects</h3></th>
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
                    <v-text-field label="Titulo" v-model="title"></v-text-field>
                    <v-btn class="primary" @click="addTitle({posX: dimentions.title.posX, posY: dimentions.title.posY, w: dimentions.title.w, h: dimentions.title.h, title})">Agregar</v-btn>
                  </td>
                </tr>
                <tr>
                  <td>Rectangulo</td>
                  <td>
                    <v-text-field v-model="dimentions.rectangle.posX" label="x"></v-text-field>
                    <v-text-field v-model="dimentions.rectangle.posY" label="y"></v-text-field>
                  </td>
                  <td>
                    <v-text-field v-model="dimentions.rectangle.w" label="w"></v-text-field>
                    <v-text-field v-model="dimentions.rectangle.h" label="h"></v-text-field>
                  </td>
                  <td>
                    <v-btn class="primary" @click="drawRectangle({
                      posX: dimentions.rectangle.posX,
                      posY: dimentions.rectangle.posY,
                      w: dimentions.rectangle.w,
                      h: dimentions.rectangle.h
                    })">Agregar</v-btn>
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
                </tbody>
              </v-simple-table>
            </v-col>
            <v-col>
              <v-simple-table>
                <thead>
                <tr>
                  <th colspan="4"><h3>Canvas settings</h3></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td colspan="2">
                    <v-text-field label="Canvas width" type="number" v-model="canvasW"></v-text-field>
                    <v-text-field label="Canvas heigth" type="number" v-model="canvasH"></v-text-field>
                  </td>
                  <td>
                    <v-text-field label="Step" v-model="step"></v-text-field>
                    <v-switch v-model="grid" label="Grid ON/OFF"></v-switch>
                  </td>
                  <td ><v-btn color="primary" @click="applyCanvasSettings">Apply  </v-btn></td>
                </tr>
                </tbody>
              </v-simple-table>
              <v-simple-table>
                <thead>
                  <tr>
                    <th colspan="4"><h3>Acciones</h3></th>
                  </tr>
                </thead>
                <tbody>
                <tr>
                  <td colspan="1"><v-btn @click="generatePDF">Generar PDF</v-btn></td>
                  <td colspan="1"><v-btn @click="shelf">Shelf</v-btn></td>
                  <td colspan="1"><v-btn @click="generateJSON">Generar JSON</v-btn></td>
                  <td colspan="1"><v-btn @click="clearCanvas">Clear</v-btn></td>
                </tr>
                <tr>
                  <td colspan="1"><v-text-field v-model="batch.titles"></v-text-field><v-btn @click="addBatch('titles', batch.titles)">Add {{batch.titles}} titles</v-btn></td>
                  <td colspan="1"><v-text-field v-model="batch.images"></v-text-field><v-btn @click="addBatch('images', batch.images)">Add {{batch.images}} images</v-btn></td>
                  <td colspan="1"><v-text-field v-model="batch.rectangles"></v-text-field><v-btn @click="addBatch('rectangles', batch.rectangles)">Add {{batch.rectangles}} rectangles</v-btn></td>
                </tr>
                </tbody>
              </v-simple-table>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-simple-table>
                <thead>
                <tr>
                  <th colspan="3"><h4>Objetos creados</h4></th>
                </tr>
                <tr>
                  <th colspan="2">id</th>
                  <th >acciones</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in sprites" :key="item.id">
                  <td>{{JSON.stringify(item.data)}}</td>
                  <td><v-btn>Borrar</v-btn></td>
                </tr>
                </tbody>
              </v-simple-table>
            </v-col>
            <v-col>
              <p>{{generatedJSON}}</p>
            </v-col>
          </v-row>

        </v-col>
        <v-col cols="5">
            <v-container class="grid-container">
                <canvas ref="grid"></canvas>
            </v-container>
        </v-col>
    </v-row>
</template>
<script>
import * as PIXI from "pixi.js/dist/pixi";
import image from '../assets/logo.png'
import { jsPDF } from "jspdf";
import _ from 'lodash';
import {backpackShelf} from "@/utils/backpack";
  export default {
    name: "PIXIExample",
    data() {
      return {
        canvasW: 800,
        canvasH: 1125,
        step: 100,
        grid: true,
        canvas: null,
        pixiApp: null,
        graphics: [],
        sprites: [],
        title: 'Title',
        dimentions: {
          title: {posX: 400, posY: 600, w: 120, h: 40},
          rectangle: {posX: 400, posY: 600, w: 120, h: 40},
          image: {posX: 400, posY: 400, w: 100, h: 200},
        },
        batch: {
          titles: 1,
          images: 1,
          rectangles: 1
        },
        generatedJSON: ''
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
          resizeTo: window
        })
        this.drawGrid()
      },
      clearCanvas() {
        this.deleteAllOulines();
        this.sprites.forEach(item => this.pixiApp.stage.removeChild(item.sprite))
        this.sprites = []
        this.graphics = this.graphics.filter(item => item.type == 'grid')
      },
      addBatch(type, amount) {
        console.log({type, amount})
        new _.range(amount).forEach((i, index) => {
          const randomParams = {
            posX: _.random(1, this.canvasW/2),
            posY: _.random(1, this.canvasH/2),
            w: _.random(1, this.canvasW/2),
            h: _.random(1, this.canvasH/2),
          }
          switch (type){
            case 'images':
              this.drawSprite(randomParams)
              break;
            case 'titles':
              console.log("CASE TITLE", {randomParams})
              this.addTitle({...randomParams, title: `Title ${index}`})
              break;
            case 'rectangles':
              this.drawRectangle(randomParams)
              break;
          }
        })
      },
      drawOutline(sprite, {color, posX ,posY, w, h}) {
        const graphics = new PIXI.Graphics()
        graphics.beginFill(color);
        graphics.lineStyle(1, 0);
        graphics.drawRect(posX, posY, w, h);
        graphics.endFill()
        this.pixiApp.stage.addChild( graphics);
        this.graphics.push({ data: {posX ,posY, w, h}, graphics, type: 'outline', id: Math.random()})
      },
      deleteAllOulines (){
        this.graphics.filter(item => item.type == 'outline').forEach(item => this.pixiApp.stage.removeChild(item.graphics))
      },
      drawRectangle({posX ,posY, w, h, color=0xFF0000}) {
        const sprite = PIXI.Sprite.from(PIXI.Texture.WHITE);
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
        sprite.tint = color;
        this.drawOutline(sprite, {posX ,posY, w, h, color})
        this.sprites.push({ id: Math.random(), data: {posX ,posY, w, h, image, color}, sprite, type: 'rectangle'})
        this.pixiApp.stage.addChild( sprite);
      },
      addTitle({posX,posY,w,h, title}) {
        const text = new PIXI.Text(title,{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
        text.position.x = posX;
        text.position.y = posY;
        text.width = w;
        text.height = h;
        this.sprites.push({id: Math.random(), data: {posX ,posY, w, h, image},type: 'title', sprite: text})
        this.pixiApp.stage.addChild(text)
      },
      setCanvasSize() {
      console.log()
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
          graphics.lineTo(this.canvasW, y);
        }
        this.graphics.push({id: Math.random(), type: 'grid', graphics})
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
        this.sprites.push({id: Math.random(), data: {posX ,posY, w, h, image},type: 'image', sprite})
        this.pixiApp.stage.addChild( sprite);
      },
      applyCanvasSettings(){
        this.removeGrid()
        this.toggleGrid();
        this.setCanvasSize();
      },
      toggleGrid () {
        this.removeGrid();
        if (this.grid) {
          this.drawGrid()
        }
      },
      removeGrid() {
        this.pixiApp.stage.removeChild(this.graphics.find(item => item.type == 'grid').graphics)
      },
      changeSpritePosition(sprite, {posX, posY}){
        sprite.position.x = posX;
        sprite.position.y = posY;
      },
      shelf() {
        this.deleteAllOulines();
        const CANVAS_DIMENTIONS = {w: Math.floor(this.canvasW), h: Math.floor(this.canvasH)};
        const normalizedSprites = this.normalizeObjects();
        const solutions = backpackShelf({
          canvasDimentions:CANVAS_DIMENTIONS,
          items: normalizedSprites.sort((a,b) => a.h -b.h).reverse(),
          solutions: [],
          heightRemaining: CANVAS_DIMENTIONS.h
        });

        for (let i=0; i< normalizedSprites.length; i++){
          const solution = solutions.find(item => item.id === normalizedSprites[i].id)
          console.log({hasSolution: solution})
          if (solution) {
            this.changeSpritePosition(solution.sprite, {posX: solution.x, posY: solution.y})
            if (solution.type === 'rectangle'){
              this.drawOutline(solution.sprite, {posX: solution.x, posY: solution.y, h: solution.h, w: solution.w, color: solution.color})
            }
          }else {
            this.pixiApp.stage.removeChild(normalizedSprites[i].sprite)
          }
        }
      },
      normalizeObjects(){
        return this.sprites.map(item => ({w: Math.floor(item.data.w), h: Math.floor(item.data.h), sprite: item.sprite, color: item.data.color, ...item}))
      },
      generatePDF () {
        this.pixiApp.renderer.render(this.pixiApp.stage);
        const data = this.pixiApp.renderer.view.toDataURL();//what to do with this data? one option is to assign it as the src of an <image> //In this case I open another window to display itvar win=window.open();win.document.write("<img src='" + data + "'/>");//or you can grab a js plugin like Canvas2Image.js which downloads the image directly//though it still has some bugsCanvas2Image.saveAsPNG(renderer.view);
        const pdf = new jsPDF();
        pdf.addImage(data, 'JPEG', 0, 0);
        pdf.save("download.pdf");
      },
      generateJSON(){
        this.generatedJSON = JSON.stringify({
          graphics: this.graphics.map(item => ({...item, graphics: undefined})),
          sprites: this.sprites.map(item => ({...item, sprite: undefined}))
        })
      }
    }
  }
</script>

<style scoped>

</style>