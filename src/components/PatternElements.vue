<template>
    <h1>Patterns</h1>
</template>

<script>
/* eslint-disable */
import { userSession } from '../userSession'

export default {
  name: 'patternElements',
  props: ['user', 'canvas_to_json', 'allShapes', 'selectedNode'],
  mounted() {
  },
  data () {
    return {
      colorPickerColor: this.canvas_to_json.background.fill,
      canvas_to_json_mut: this.canvas_to_json,
      backgroundFillType: "solid"
    }
  },
  components: {
  },
  watch : {
    canvas_to_json: function(canvas_to_json) {
      this.canvas_to_json_mut = canvas_to_json;
    }
  },
  methods: {
    changeBackground(background_type) {
        switch (background_type) {
            case "solid":
                this.canvas_to_json_mut.background.fill = this.colorPickerColor;
                this.$emit('updateCanvasToJson', this.canvas_to_json_mut);
                break;

            case "gradient":
                this.addGradient();
                break;
                
            default: 
                this.$emit('updateCanvasToJson', this.canvas_to_json_mut);
                this.canvas_to_json_mut.background.fill = this.colorPickerColor;
        }
    console.log("background now", this.canvas_to_json_mut.background.fill);
    },
    addGradient() {
      this.backgroundFillType = "solid";
      this.canvas_to_json_mut.background["fillLinearGradientStartPoint"] = { x: -50, y: -50 }
      this.canvas_to_json_mut.background["fillLinearGradientEndPoint"] = { x: 250, y: 250 };
      this.canvas_to_json_mut.background["fillLinearGradientColorStops"] = [0, 'red', 1, 'yellow'];
    },
    changeColor(color) {
      let hex = color.rgba.toHexString();
      this.colorPickerColor = hex;
      this.changeBackground();
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