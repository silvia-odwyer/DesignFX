<template>
    <ul>
      <h3>Background</h3>
      <div class="elements">
          <div class="element_btn" v-on:click="changeBackground('solid')">
            <font-awesome-icon icon="square-full" size="4x"/>
            <p>Change Solid Background</p>
          </div>

          <div class="element_btn" v-on:click="changeBackground('gradient')">
            <font-awesome-icon icon="square-full" size="4x"/>
            <p>Add Gradient</p>
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
  name: 'background',
  props: ['user', 'canvas_to_json', 'allShapes', 'selectedNode'],
  mounted() {
    console.log("BACKGROUND", this.canvas_to_json);
  },
  data () {
    return {
      colorPickerColor: this.canvas_to_json.background.fill,
    }
  },
  components: {
    colorPicker
  },
  methods: {
    changeBackground(background_type) {

        switch (background_type) {
            case "solid":
                this.canvas_to_json.background.fill = this.colorPickerColor;
                break;

            case "gradient":
                this.addGradient();
                break;
                
            default: 
                this.canvas_to_json.background.fill = this.colorPickerColor;
        }
    },
    addGradient() {
        this.canvas_to_json.background["fillLinearGradientStartPoint"] = { x: -50, y: -50 }
        this.canvas_to_json.background["fillLinearGradientEndPoint"] = { x: 250, y: 250 };
        this.canvas_to_json.background["fillLinearGradientColorStops"] = [0, 'red', 1, 'yellow'];
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