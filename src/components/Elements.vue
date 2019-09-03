<template>
    <article>
      <h3>Elements</h3>
      <div class="elements">

        <article v-for="i in elementTypesGroup1.length">
          <div class="element_btn" v-on:click="displayElementList(elementTypesGroup1[i - 1])">
            <font-awesome-icon icon="square-full" size="4x"/>
            <h1>{{elementTypesGroup1[i - 1]}}</h1>  
          </div>

        </article>
      </div>
        <component v-bind:is="elementTypeToComponent[currentElementType]"
          v-bind:style="{ marginTop: '2em' }"
          @updateCanvasToJson="updateCanvas"
          :canvas_to_json="canvas_to_json"
          ></component>

          <!-- Content -->
        <slot />
  
    </article>
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
    this.colorPickerColor = "#67F7F7";

    this.canvas_to_json_mut = this.canvas_to_json;
    
  },
  data () {
    return {
      colorPickerColor: null,
      canvasShapes: {"line" : this.canvas_to_json.elements.lines, "circle": this.canvas_to_json.elements.circles, 
      "rectangle": this.canvas_to_json.elements.rectangles, "ellipse": this.canvas_to_json.elements.ellipses},
      canvas_to_json_mut: null,
      elementTypes: ["Emoji"],
      elementTypesGroup1: ["Shapes", "Icons", "Emoji", "Gradients"],
      elementTypesGroup2: ["Emoji"],
      prevElementType: "Shapes",
      currentElementType: "Shapes",
      elementTypeToComponent: {"Shapes" : ShapeElements, "Gradients": GradientElements, "Icons": IconElements, "Patterns": PatternElements, "Emoji": EmojiElements, "": ShapeElements}
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
    },
    selectedNode : function (node) {
      // Update selected node
      if (node == null) {
        console.log("prev sidebar item", this.prevElementType);
        this.displayElementList(this.prevElementType);
      }

    }
  
  },
  methods: {
    displayElementList(elementType) {
      this.currentElementType = elementType;
      this.prevElementType = elementType;
      console.log("prev element type SET TO", this.prevElementType);
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