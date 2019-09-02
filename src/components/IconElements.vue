<template>
<article>
  <font-awesome-icon v-for="icon in icons" :icon="icon" v-bind:key="icon" size="4x" v-on:click="addIcon"/>

</article>
</template>

<script>
/* eslint-disable */
import { userSession } from '../userSession'

export default {
  name: 'iconElements',
  props: ['user', 'canvas_to_json', 'allShapes', 'selectedNode'],
  mounted() {
  },
  data () {
    return {
      canvas_to_json_mut: this.canvas_to_json,
      icons: ["arrow-alt-circle-down", "shapes"],
      iconToCode: {}
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
    changeColor(color) {
      let hex = color.rgba.toHexString();
      this.colorPickerColor = hex;
      this.changeBackground();
    },
    addIcon() {
      let num = this.canvas_to_json_mut.text.length;
      var simpleText = {
        x: 20,
        y: 15,
        text: "\uf21c",
        fontSize: 300,
        fontFamily: 'FontAwesome',
        fill: 'green',
        draggable: true,
        name: `icon_${num}`
      };

      this.canvas_to_json_mut.text.push(simpleText);
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
  cursor: pointer;
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