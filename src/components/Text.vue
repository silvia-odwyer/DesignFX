<template>
    <section>
          
    <h3>Text</h3>
      <div>
          <button v-on:click="addText">Draw Text</button>

          <h3>Text Elements </h3>
          <ul>
            <li v-on:click="addText(headingTextElem)"><h1>Heading</h1></li>
            <li v-on:click="addText(secondaryHeadingTextElem)"><h2>Secondary Heading</h2></li>
            <li v-on:click="addText(paragraphTextElem)">Paragraph text</li>

          </ul>

      </div>              
    </section>
</template>

<script>
/* eslint-disable */
import { userSession } from '../userSession'
import image from "@/assets/daisies_small.jpg";
import colorPicker from '@caohenghu/vue-colorpicker'

export default {
  name: 'textOptions',
  props: ['user', 'allShapes', 'ifTextOptions', 'selectedNode', 'canvas_to_json'],
  components: {
    colorPicker
  },
  watch : {
    ifTextOptions: function(ifTextOptions) {
      this.ifTextOptions = ifTextOptions;
    },
    canvas_to_json: function(canvas_to_json) {
      this.canvas_to_json_mut = canvas_to_json;
    }
  },
  data () {
    return {
      img: null,
      headingTextElem: {fontSize: 100, fontFamily: "Roboto"},
      secondaryHeadingTextElem: {fontSize: 40, fontFamily: "Roboto"},
      paragraphTextElem: {fontSize: 20, fontFamily: "Helvetica"},
      canvas_to_json_mut: this.canvas_to_json
    }
  },
  mounted() {
    console.log("if text options text comp", this.ifTextOptions);
  },
  methods: {    
    addText(text_elem) {

      let name = `text_node${this.canvas_to_json_mut.text.length + 1}`
      
      let simpleText = {
        x: 50,
        y: 50,
        text: 'Sample Text',
        fill: this.textColor,
        draggable: 'true',
        name: name,
        isVisible: true
      };

      simpleText.fontSize = text_elem.fontSize;
      simpleText.fontFamily = text_elem.fontFamily;
      
      this.canvas_to_json_mut.text.push(simpleText);

      this.allShapes.push(simpleText);
      this.$emit('updateCanvasToJson', this.canvas_to_json_mut);
      // this.selectedNode = simpleText;
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @font-face {
    font-family: 'FontAwesome';
    src: url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/fonts/fontawesome-webfont.ttf');
    font-weight: normal;
    font-style: normal;
}
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