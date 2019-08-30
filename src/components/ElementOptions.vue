<template>
    <div class="elementOptions">
        <h2>Element Options</h2>
        <div>
            <colorPicker
                :color="elementColor"
                @changeColor="changeColor"
            />
        </div>
    </div>  
</template>

<script>
/* eslint-disable */
import { userSession } from '../userSession'
import colorPicker from '@caohenghu/vue-colorpicker'

export default {
  name: 'elementOptions',
  props: ['user', 'canvas_to_json', 'allShapes', 'transformer', 'changesMade', 'selectedNode'],
  components: {
    colorPicker
  },
  watch : {
    canvas_to_json: function(canvas_to_json) {
      this.canvas_to_json_mut = canvas_to_json;
    },
    selectedNode: function(selectedNode) {
        let shapeList = this.getShapeList();
        this.elementNode =  shapeList.find(elem => elem.name === selectedNode.name);
    }
  },
  data () {
    return {
        canvas_to_json_mut: this.canvas_to_json,
        elementNode: null,
        elementColor: "black",
    }
  },
  mounted() {
    console.log("SELECTED NODE", this.selectedNode)
    let shapeList = this.getShapeList();
    this.elementNode = shapeList.find(elem => elem.name === this.selectedNode.name);
  },
  methods: {
    changeColor(color) {
      let hex = color.rgba.toHexString();
      this.elementColor = hex;
      if (this.selectedNode != undefined || this.selectedNode != null ) {
        this.elementNode.fill = hex;
        this.$emit('updateCanvasToJson', this.canvas_to_json_mut);
      }
    },
    getShapeList() {
        let node_name = this.selectedNode.name.substr(0, 3);
        let shape_names = Object.keys(this.canvas_to_json_mut.elements)
        for (var j = 0; j < shape_names.length; j++) {
            let shape_name = shape_names[j];
            if (shape_name.startsWith(node_name)) {
                return this.canvas_to_json_mut.elements[shape_name];
            }
        }
    }
  }
}
</script>

<style>
section{
  margin-left: 2vh;
}

ul li {
  text-decoration: none;
  list-style: none;
  padding-right: 4em;
  cursor: pointer;
  color: silver;
  font-family: "Helvetica Neue", sans-serif;
}

label {
  color: silver;
  font-family: "Roboto", sans-serif;
  display: block;
}

.textOptions {
  padding-top: 3vh;
  margin-left: 3vh;
}

button {
  background-color: black;
  padding: 2vh;
  color: white;
  border: none;
  border-radius: 0.2vh;
  cursor: pointer;
  margin-left: 2vh;
}

h2 {
  font-size: 2.5vh;
}

button:hover{
  color: gainsboro;
}

</style>