<template>
    <ul>
          
    <h3>Elements</h3>
    <ul>
        <li v-on:click="addRectangle('red')">Add Red Rectangle</li>
        <li v-on:click="addRectangle('green')">Add Green Rectangle</li>
        <div :style="{background: colorPickerColor}">
            <color-picker
                :color="colorPickerColor"
                :sucker-hide="false"
                :sucker-canvas="suckerCanvas"
                :sucker-area="suckerArea"
                @changeColor="changeColor"
                @openSucker="openSucker"
            />
        </div>
        <li v-on:click="save()">Save</li>
        <li v-on:click="clear()">Clear</li>
    </ul>              
    </ul>
</template>

<script>
/* eslint-disable */
import { userSession } from '../userSession'
import colorPicker from '@caohenghu/vue-colorpicker'

export default {
  name: 'elements',
  props: ['user', 'rectangles', 'allShapes', 'images', 'text'],
  data () {
    return {
      colorPickerColor: '#59c7f9',
      suckerCanvas: null,
      suckerArea: [],
      isSucking: false
    }
  },
  components: {
    colorPicker
  },
  methods: {
    addRectangle(color) {
      let name = `rect${this.rectangles.length + 1}`

      var rect = {
                x: 10,
                y: 10,
                width: 100,
                height: 100,
                fill: this.colorPickerColor,
                name: name,
                draggable: true
              };

      this.rectangles.push(rect);
      this.allShapes.push(rect);
    },
    changeColor(color) {
      let hex = color.rgba.toHexString();
      this.colorPickerColor = hex;
    },
    openSucker(isOpen) {
      if (isOpen) {
        // this.suckerCanvas = canvas
        // this.suckerArea = [x1, y1, x2, y2]
      } else {
        // this.suckerCanvas && this.suckerCanvas.remove
      }
    },
    clear() {
      this.rectangles = [];
      this.text = [];
      this.images = [];
    //   const transformerNode = this.$refs.transformer.getStage();
    //   transformerNode.detach();

      console.log("cleared");
      localStorage.setItem('storage', JSON.stringify([]));
    },
    fetchData () {
      userSession.getFile(STORAGE_FILE) // decryption is enabled by default
        .then((todosText) => {
          var notes = JSON.parse(todosText || '[]')
          notes.forEach(function (note, index) {
            note.id = index
          })
          this.uidCount = notes.length
          this.notes = notes
        })

      // userSession.getFile("image1.PNG") // decryption is enabled by default
      //   .then((buffer) => {
      //     var canvas = document.getElementById("canvas");
      //     var context = canvas.getContext("2d");
      //     var imageData2 = context.createImageData(canvas.width, canvas.height);
      //     imageData2.data.set(buffer);
      //     console.log(imageData2);

      //     context.putImageData(imageData2, 0, 0);

      //   })
    },

    signOut () {
      userSession.signUserOut(window.location.href)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
ul li {
    cursor: pointer;
    color: silver;
    font-family: "Helvetica Neue", sans-serif;
    list-style: none;
}
</style>