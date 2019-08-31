<template>
    <ul>
      <h3>Elements</h3>
      <div class="elements">
          <div class="element_btn" v-on:click="addShapeElement('rectangle', 'solid')">
            <font-awesome-icon icon="square-full" size="4x" style="color: red"/>
            <p>Rectangle</p>
          </div>

          <div class="element_btn" v-on:click="addShapeElement('circle', 'solid')">
            <font-awesome-icon icon="circle" size="4x" style="color: orange"/>
            <p>Circle</p>
          </div>

          <div class="element_btn" v-on:click="addShapeElement('ellipse', 'solid')">
            <font-awesome-icon icon="circle" size="4x"/>
            <p>Ellipse</p>
          </div>

          <div class="element_btn" v-on:click="addShapeElement('line', 'solid')">
            <font-awesome-icon icon="chart-line" size="4x"/>
            <p>Line</p>
          </div>
      </div>
      
      <h2> Gradients </h2>
      <div class="elements">

          <div class="element_btn" v-on:click="addShapeElement('rectangle', 'gradient')">
            <font-awesome-icon icon="square-full" size="4x"/>
            <p>Rectangle</p>
          </div>   

          <div class="element_btn" v-on:click="addShapeElement('circle', 'gradient')">
            <font-awesome-icon icon="circle" size="4x"/>
            <p>Circle</p>
          </div>   

          <div class="element_btn" v-on:click="addShapeElement('ellipse', 'gradient')">
            <font-awesome-icon icon="square-full" size="4x"/>
            <p>Ellipse</p>
          </div>   

      </div>       
    </ul>
</template>

<script>
/* eslint-disable */
import { userSession } from '../userSession'
import colorPicker from '@caohenghu/vue-colorpicker'

export default {
  name: 'elements',
  props: ['user', 'canvas_to_json', 'allShapes', 'selectedNode'],
  mounted() {
    console.log("canvas to json in elements", this.canvas_to_json);
    this.canvasShapes = {"line" : this.canvas_to_json.elements.lines, "circle": this.canvas_to_json.elements.circles, 
      "rectangle": this.canvas_to_json.elements.rectangles, "ellipse": this.canvas_to_json.elements.ellipses};
    
    this.colorPickerColor = "#67F7F7"
    
  },
  data () {
    return {
      colorPickerColor: null,
      canvasShapes: null,
      canvas_to_json_mut: this.canvas_to_json
    }
  },
  components: {
    colorPicker
  },
  watch : {
    canvas_to_json: function(canvas_to_json) {
      this.canvas_to_json_mut = canvas_to_json;
    }
  },
  methods: {
    addShapeElement(shape_name, fill) {

      var shape_list = this.canvasShapes[shape_name];
      var name = `${shape_name}${shape_list.length + 1}`;
      var shape;
      var index_name;

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
          index_name = "lines";
          break;

        case "rectangle":
           shape = {
                x: 10,
                y: 10,
                width: 100,
                height: 100,
                name: name,
                draggable: true
            };
            index_name = "rectangles";
            break;
        case "circle":
           shape = {
            x : 160, 
            y: 180, 
            radius: 50, 
            name: name,
            draggable: true
            };
            index_name = "circles";
            break;
        
        case "ellipse": 
          shape = {
              radius : {
                x : 50,
                y : 70
              },
              x: 100, 
              y: 100,
              draggable: true,
              name: name
            };
            index_name = "ellipses";
            break;
      }

      // Add fill to element 
      switch (fill) {
        case "solid":
          shape.fill = this.colorPickerColor;
          shape.fillType = "solid";
          break;

        case "gradient":
          shape.fillType = "gradient";
          shape.fillLinearGradientStartPoint = { x: -50, y: -50 };
          shape.fillLinearGradientEndPoint = { x: 250, y: 250 };
          shape.fillLinearGradientColorStops = [0, this.colorPickerColor, 1, 'yellow'];
          break;
      }

      console.log("ADDED SHAPE", shape);

      this.allShapes.push(shape);
      this.canvas_to_json_mut.elements[index_name].push(shape);
      this.$emit('updateCanvasToJson', this.canvas_to_json_mut);
    },
    clear() {
      for (var i = 0; i < this.canvas_to_json.elements.length; i++) {
        let list = this.canvas_to_json.elements[i];
        list = [];
      };
      
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
  font-family: "Roboto", sans-serif;
}

.element_btn {
  border: solid black 0.1em;
  border-radius: 0.3em;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  cursor: pointer;
  margin: 0 0.5vh 0.5vh;
  padding: 0.5vh 0.5vh 0.5vh 0.5vh;
  flex: 1 0 33%;
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