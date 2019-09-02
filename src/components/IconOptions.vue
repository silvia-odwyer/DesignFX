<template>
    <div class="elementOptions">
        <h2>Icon Options</h2>
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
import TextInputField from "@/components/TextInputField.vue"

export default {
  name: 'elementOptions',
  props: ['user', 'canvas_to_json', 'allShapes', 'transformer', 'changesMade', 'selectedNode'],
  components: {
    colorPicker,
    TextInputField
  },
  watch : {
    canvas_to_json: function(canvas_to_json) {
      this.canvas_to_json_mut = canvas_to_json;
    },
    selectedNode: function(selectedNode) {
        this.elementNode = this.canvas_to_json_mut.text.find(elem => elem.name === this.selectedNode.name);
        console.log("elemnode in elemoptions", this.elementNode);
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
    this.elementNode = this.canvas_to_json_mut.text.find(elem => elem.name === this.selectedNode.name);
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
  }
}
</script>

<style>
.elementOptions {
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
  font-family: "Lato", sans-serif;
  color: lightgray;
}

button:hover{
  color: gainsboro;
}

</style>