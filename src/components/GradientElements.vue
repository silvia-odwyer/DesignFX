<template>
    <article>
        <h1>Gradients</h1>

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
    </article>
</template>

<script>
/* eslint-disable */
import { userSession } from '../userSession'

export default {
  name: 'gradientElements',
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
    },
    addShapeElement(shape_name, fill) {
      var shape, index_name;
      var shape_list = this.canvasShapes[shape_name];
      var name = `${shape_name}${shape_list.length + 1}`;

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
          shape.fill = "red";
          shape.fillType = "solid";
          break;

        case "gradient":
          shape.fillType = "gradient";
          shape.fillLinearGradientStartPoint = { x: -50, y: -50 };
          shape.fillLinearGradientEndPoint = { x: 250, y: 250 };
          shape.fillLinearGradientColorStops = [0, this.colorPickerColor, 1, 'yellow'];
          break;
      }

      this.canvas_to_json_mut.elements[index_name].push(shape);

      this.$emit('updateCanvasToJson', this.canvas_to_json_mut);
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