<template>
    <section>
          
    <h3>Text</h3>
      <div>
          <button v-on:click="addText">Draw Text</button>

          <h3>Text Elements </h3>
          <ul>
            <li v-for="elem in textElements" v-on:click="addText(elem)">
              <h1>{{elem.text}}</h1>
            </li>
          </ul>

      </div>              
    </section>
</template>

<script>
/* eslint-disable */
import { userSession } from '../userSession'
import colorPicker from '@caohenghu/vue-colorpicker'

export default {
  name: 'textOptions',
  props: ['user', 'allShapes', 'selectedNode', 'canvas_to_json'],
  components: {
    colorPicker
  },
  watch : {
    canvas_to_json: function(canvas_to_json) {
      this.canvas_to_json_mut = canvas_to_json;
    }
  },
  data () {
    return {
      img: null,
      textElements: [{text: "Heading" , fontSize: 100, fontFamily: "Roboto", fillType: "solid"},
      {text: "Secondary Heading", fontSize: 40, fontFamily: "Roboto", fillType: "solid"},
      {text: "paragraph text", fontSize: 20, fontFamily: "Helvetica", fillType: "solid"},
      {text: "gradient text", fontSize: 20, fontFamily: "Roboto", fillType: "gradient"}],
      canvas_to_json_mut: this.canvas_to_json
    }
  },
  mounted() {
  },
  methods: {    
    addText(text_elem) {
      let name = `text_node${this.canvas_to_json_mut.text.length + 1}`
      
      let simpleText = {
        x: 50,
        y: 50,
        text: text_elem.text,
        fill: this.textColor,
        draggable: 'true',
        name: name,
        isVisible: true
      };

      simpleText.fontSize = text_elem.fontSize;
      simpleText.fontFamily = text_elem.fontFamily;

      if (text_elem.fillType == "gradient") {
        simpleText.fillType = "gradient";
        simpleText.fillLinearGradientStartPoint = { x: -10, y: -10 };
        simpleText.fillLinearGradientEndPoint = { x: 20, y: 30 };
        simpleText.fillLinearGradientColorStops = [0, "red", 1, 'yellow'];
      };
      
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
section {
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
  font-size: 72px;

}

button:hover{
  color: gainsboro;
}

</style>