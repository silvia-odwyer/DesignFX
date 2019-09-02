<template>
    <ul>
      <h3>Elements</h3>
      <div class="elements">

        <article v-for="i in elementTypes.length + 1">
          <div class="element_btn" v-on:click="displayElementList(elementTypes[i])">
            <font-awesome-icon icon="square-full" size="4x"/>
            <h1>{{elementTypes[i - 1]}}</h1>  
          </div>

          <div class="element_btn" v-on:click="displayElementList(elementTypes[i + 1])">
            <font-awesome-icon icon="square-full" size="4x"/>
            <h1>{{elementTypes[i + 1]}}</h1>  
          </div>
          <component v-bind:is="elementTypeToComponent[currentElementType]"  v-if="elementTypes[i - 1] == currentElementType"
          @updateCanvasToJson="updateCanvas"
          :canvas_to_json="canvas_to_json"
          ></component>

          <!-- Content -->
          <slot />
          
        </article>

      </div>
      
  
    </ul>
</template>

<script>
/* eslint-disable */
import { userSession } from '../userSession'
import colorPicker from '@caohenghu/vue-colorpicker'
import EmojiElements from "@/components/EmojiElements.vue";
import ShapeElements from "@/components/ShapeElements.vue";
import IconElements from "@/components/IconElements.vue";
import PatternElements from "@/components/PatternElements.vue";
import GradientElements from "@/components/GradientElements.vue";

export default {
  name: 'elements',
  props: ['user', 'canvas_to_json', 'allShapes', 'selectedNode'],
  mounted() {
    console.log("canvas to json in elements", this.canvas_to_json);
    this.canvasShapes = {"line" : this.canvas_to_json.elements.lines, "circle": this.canvas_to_json.elements.circles, 
      "rectangle": this.canvas_to_json.elements.rectangles, "ellipse": this.canvas_to_json.elements.ellipses};
    
    this.colorPickerColor = "#67F7F7";

    this.canvas_to_json_mut = this.canvas_to_json;

    console.log("ELEMENTS CANVAS", this.canvas_to_json_mut);
    
  },
  data () {
    return {
      colorPickerColor: null,
      canvasShapes: null,
      canvas_to_json_mut: null,
      elementTypes: ["Shapes", "Icons", "Patterns", "Emoji"],
      currentElementType: "",
      elementTypeToComponent: {"Shapes" : ShapeElements, "Gradients": GradientElements, "Icons": IconElements, "Patterns": PatternElements, "Emoji": EmojiElements, "": EmojiElements}
    }
  },
  components: {
    colorPicker,
    EmojiElements, 
    ShapeElements, 
    IconElements, 
    PatternElements,
    GradientElements
  },
  watch : {
    canvas_to_json: function(canvas_to_json) {
      this.canvas_to_json_mut = canvas_to_json;
    }
  },
  methods: {
    displayElementList(elementType) {
      this.currentElementType = elementType;
    },
    clear() {
      for (var i = 0; i < this.canvas_to_json.elements.length; i++) {
        let list = this.canvas_to_json.elements[i];
        list = [];
      };
      
    //   const transformerNode = this.$refs.transformer.getStage();
    //   transformerNode.detach();

      localStorage.setItem('storage', JSON.stringify([]));
    },
    updateCanvas: function(canvas_to_json) {
      this.canvas_to_json_mut = canvas_to_json;

      console.log("canvas now", this.canvas_to_json_mut)
      this.$emit('updateCanvasToJson', this.canvas_to_json_mut);
    },
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

h1 {
  font-family: "Lato", sans-serif;
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