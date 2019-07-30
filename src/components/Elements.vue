<template>
    <ul>
      <h3>Elements</h3>
      <div class="elements">
          <div class="element_btn" v-on:click="addShapeElement('rectangle')">
            <font-awesome-icon icon="square-full" size="4x"/>
            <p>Add Rectangle</p>
          </div>

          <div class="element_btn" v-on:click="addShapeElement('circle')">
            <font-awesome-icon icon="ellipsis-h" size="4x"/>
            <p>Add Circle</p>
          </div>

          <div class="element_btn" v-on:click="addShapeElement('ellipse')">
            <font-awesome-icon icon="circle" size="4x"/>
            <p>Add Ellipse</p>
          </div>

          <div class="element_btn" v-on:click="addShapeElement('line')">
            <font-awesome-icon icon="chart-line" size="4x"/>
            <p>Add Line</p>
          </div>

          <div :style="{background: colorPickerColor}">
              <color-picker
                  :color="colorPickerColor"
                  @changeColor="changeColor"
              />
          </div>
          <li v-on:click="save()">Save</li>
          <li v-on:click="clear()">Clear</li>
      </div>              
    </ul>
</template>

<script>
/* eslint-disable */
import { userSession } from '../userSession'
import colorPicker from '@caohenghu/vue-colorpicker'

export default {
  name: 'elements',
  props: ['user', 'canvas_to_json', 'allShapes', 'images', 'text', 'selectedNode'],
  data () {
    return {
      colorPickerColor: '#59c7f9',
      canvasShapes: {"line" : this.canvas_to_json.elements.lines, "circle": this.canvas_to_json.elements.circles, 
      "rectangle": this.canvas_to_json.elements.rectangles, "ellipse": this.canvas_to_json.elements.ellipses},
    }
  },
  components: {
    colorPicker
  },
  methods: {
    addShapeElement(shape_name) {
      var shape_list = this.canvasShapes[shape_name];
      let name = `${shape_name}${shape_list.length + 1}`;
      var shape;

      switch (shape_name) {
        case "line": 
          shape = {
            x: 20,
            y: 200,
            tension: 0.5,
            stroke: 'black',
            draggable: true,
            name: name
          };
          break;

        case "rectangle":
           shape = {
                x: 10,
                y: 10,
                width: 100,
                height: 100,
                fill: this.colorPickerColor,
                name: name,
                draggable: true
            };
            break;

        case "circle":
           shape = {
            x : 160, 
            y: 180, 
            radius: 50, 
            fill: this.colorPickerColor, 
            name: name,
            draggable: true
            }
            break;
        
        case "ellipse": 
          shape = {
              radius : {
                x : 50,
                y : 70
              },
              x: 100, 
              y: 100,
              fill: this.colorPickerColor,
              draggable: true,
              name: name
            };
            break;
      }
      shape_list.push(shape);
      this.allShapes.push(shape);
    },
    changeColor(color) {
      let hex = color.rgba.toHexString();
      this.colorPickerColor = hex;
      this.selectedNode.fill = hex;
    },
    clear() {
      for (var i = 0; i < this.canvas_to_json.elements.length; i++) {
        let list = this.canvas_to_json.elements[i];
        list = [];
      };
      
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

h3 {
  color: white;
  font-size: 3vh;
  font-family: "Helvetica Neue", sans-serif;
}

.element_btn {
  border: solid black 0.1em;
  border-radius: 0.3em;
  width: 50%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  cursor: pointer;
}

.element_btn:hover {
  color: silver;
}

font-awesome-icon {
  display: block;
}

.elements {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

p {
  color: silver;
}
</style>