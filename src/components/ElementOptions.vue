<template>
    <div class="elementOptions">
        <h2>Element Options</h2>
        <div>
            <colorPicker
                :color="elementColor"
                @changeColor="changeColor"
            />

            <article>
              <h4>Color 2</h4>
              <colorPicker v-show="elementNode.fillType == 'gradient'" 
                  :color="elementColor2"
                  @changeColor="changeColor2"
              />
              <label>X Start Point</label>
              <TextInputField :text="xStartPoint" @updateTextValue="updateXStartPoint"></TextInputField>

            </article>
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
  props: ['user', 'canvas_to_json', 'allShapes', 'changesMade', 'selectedNode'],
  components: {
    colorPicker,
    TextInputField
  },
  watch : {
    canvas_to_json: function(canvas_to_json) {
      this.canvas_to_json_mut = canvas_to_json;
    },
    selectedNode: function(selectedNode) {

      if (this.selectedNode != undefined || this.selectedNode != null) {
        let shapeList = this.getShapeList();
        this.elementNode = shapeList.find(elem => elem.name === selectedNode.name);
        console.log("elemnode in elemoptions", this.elementNode);
    }
    }
  },
  data () {
    return {
        canvas_to_json_mut: this.canvas_to_json,
        elementNode: null,
        elementColor: "black",
        elementColor2: "red",
        xStartPoint: 250,
    }
  },
  mounted() {
    console.log("SELECTED NODE", this.selectedNode);

    if (this.selectedNode != undefined && this.selectedNode != null) {
      let shapeList = this.getShapeList();

      console.log("!!LOOKING FOR NAME", this.selectedNode.name);
      console.log("!!SHAPE LIST NOW", shapeList);
      this.elementNode = shapeList.find(elem => elem.name === this.selectedNode.name);
      console.log("ELEMENT NODE NOW", this.elementNode);
    }

  },
  methods: {
    changeColor(color) {
      let hex = color.rgba.toHexString();
      this.elementColor = hex;
      if (this.selectedNode != undefined || this.selectedNode != null ) {

        if (this.elementNode.fillType == "solid") {
          this.elementNode.fill = hex;
        }
        else if (this.elementNode.fillType == "gradient") {
            this.elementNode.fillLinearGradientStartPoint = { x: -50, y: -50 };
            this.elementNode.fillLinearGradientEndPoint = { x: 250, y: 250 };
            this.elementNode.fillLinearGradientColorStops = [0, hex , 1, 'yellow'];
        }
        this.$emit('updateCanvasToJson', this.canvas_to_json_mut);
      }
    },
    changeColor2(color) {
      let hex = color.rgba.toHexString();
      this.elementColor2 = hex;
      if (this.selectedNode != undefined || this.selectedNode != null ) {
            this.elementNode.fillLinearGradientStartPoint = { x: -50, y: -50 };
            this.elementNode.fillLinearGradientEndPoint = { x: 250, y: 250 };
            this.elementNode.fillLinearGradientColorStops = [0, this.elementColor , 1, this.elementColor2];
        }
        this.$emit('updateCanvasToJson', this.canvas_to_json_mut);
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

    },
    updateXStartPoint: function(value) {
      if (this.selectedNode != undefined || this.selectedNode != null ) {
        this.elementNode.fillLinearGradientEndPoint = { x: value, y: 250 };
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