<template>
<article>
  <article class="icons">
    <font-awesome-icon v-for="icon in Object.keys(iconToCode)" :icon="icon" v-bind:key="icon" size="4x" v-on:click="addIcon(icon)" class="icon"/>

  </article>
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
      iconToCode: {"angle-double-up":"\uf102", "check-square": "\uf14a", "chart-bar": "\uf080", "chart-line": "\uf201", "chart-pie": "\uf200", "align-justify": "\uf039", "barcode": "\uf02a"}
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
    addIcon(iconName) {
      let iconUnicode = this.iconToCode[iconName];
      let num = this.canvas_to_json_mut.text.length;
      var icon = {
        x: 20,
        y: 15,
        text: `${iconUnicode}`,
        fontSize: 300,
        fontFamily: 'FontAwesome',
        fill: 'green',
        draggable: true,
        name: `icon_${num}`
      };

      this.canvas_to_json_mut.text.push(icon);
      this.$emit('updateCanvasToJson', this.canvas_to_json_mut);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.icons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}


.icon {
  cursor: pointer;
  margin: 0.5em;
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