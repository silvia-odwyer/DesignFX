<template>
    <article>
        <h1>Gradients</h1>

        <div class="elements">
            <div class="element_btn" v-on:click="addShapeElement('rectangle')">
                <font-awesome-icon icon="square-full" size="4x"/>
                <p>Rectangle</p>
            </div>   

            <div class="element_btn" v-on:click="addShapeElement('circle')">
                <font-awesome-icon icon="circle" size="4x"/>
                <p>Circle</p>
            </div>   

            <div class="element_btn" v-on:click="addShapeElement('ellipse')">
                <font-awesome-icon icon="square-full" size="4x"/>
                <p>Ellipse</p>
            </div>   
        </div>     

        <h1>Preset Gradients</h1>
        <article class="elements">
          <div class="element_btn" v-for="gradientStyle in presetGradients" v-on:click="addPresetGradientShape('rectangle', gradientStyle)">
            <div v-bind:style="gradientStyle"></div>
          </div>
        </article>
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
       canvasShapes: {"line" : this.canvas_to_json.elements.lines, "circle": this.canvas_to_json.elements.circles, 
      "rectangle": this.canvas_to_json.elements.rectangles, "ellipse": this.canvas_to_json.elements.ellipses},
      backgroundFillType: "solid",
      rawGradientVals: [["blue", "fuchsia"], ["#3494E6", "#EC6EAD"], ["#67B26F", "#4ca2cd"], ["#36D1DC", "#5B86E5"], ["blue", "fuchsia"], ["#1c92d2", "#f2fcfe"], ["#000000", "#0f9b0f"], ["#CB356B", "#BD3F32"], ["#3A1C71", "#D76D77", "#FFAF7B"], ["#283c86", "#45a247", ["#159957", "#155799"], ["#000046", "#1CB5E0"]]]
    }
  },
  computed: {
    presetGradients() {
      let gradientStyles = [];
      for (var i = 0; i < this.rawGradientVals.length; i++) {
        let color1 = this.rawGradientVals[i][0];
        let color2 = this.rawGradientVals[i][1];
        let linearGradient =  `linear-gradient(90deg, ${color1}, ${color2})`
        let gradientStyle = {width: '50%', height: '10vh', backgroundImage: linearGradient};
        gradientStyles.push(gradientStyle);
      }
      console.log("preset grads", gradientStyles);
      return gradientStyles;

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
    addShapeElement(shape_name) {
      let shape_and_indexname = this.createShapeElement(shape_name)
      let shape = shape_and_indexname[0];
      let index_name = shape_and_indexname[1];

      shape.fillType = "gradient";
      shape.fillLinearGradientStartPoint = { x: -50, y: -50 };
      shape.fillLinearGradientEndPoint = { x: 250, y: 250 };
      shape.fillLinearGradientColorStops = [0, this.colorPickerColor, 1, 'yellow'];

      this.canvas_to_json_mut.elements[index_name].push(shape);

      this.$emit('updateCanvasToJson', this.canvas_to_json_mut);
    },
    addPresetGradientShape(shape_name, gradient) {
      let shape_and_indexname = this.createShapeElement(shape_name)
      let shape = shape_and_indexname[0];
      let index_name = shape_and_indexname[1];

      shape.fillType = "gradient";
      shape.fillLinearGradientStartPoint = { x: -120, y: -120 };
      shape.fillLinearGradientEndPoint = { x: 100, y: 100 };
      let linearGradient = gradient.backgroundImage;
      linearGradient = linearGradient.slice(23, linearGradient.length - 1).split(", ");
      console.log("gradient", linearGradient);
      shape.fillLinearGradientColorStops = [0, linearGradient[0], 1, linearGradient[1]];

      this.canvas_to_json_mut.elements[index_name].push(shape);

      this.$emit('updateCanvasToJson', this.canvas_to_json_mut);
    },
    createShapeElement(shape_name) {
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

      return [shape, index_name];
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