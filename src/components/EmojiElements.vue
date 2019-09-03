<template>
<article>
  <article class="icons">
    <p v-for="emojiName in emojiNames" v-on:click="insertEmoji(emojiName)" v-bind:key="emojiName">{{emoji[emojiName].char}}</p>
  </article>
</article>
</template>

<script>
/* eslint-disable */
import { userSession } from '../userSession'

import * as emoji from "emojilib";

export default {
  name: 'emojiElements',
  props: ['user', 'canvas_to_json', 'allShapes', 'selectedNode'],
  mounted() {
    this.emojiNames = Object.keys(emoji.lib);
    console.log(emoji.lib)
  },
  data () {
    return {
      canvas_to_json_mut: this.canvas_to_json,
      icons: ["arrow-alt-circle-down", "shapes"],
      iconToCode: {"angle-double-up":"\uf102", "check-square": "\uf14a", "chart-bar": "\uf080", "chart-line": "\uf201", "chart-pie": "\uf200", "align-justify": "\uf039", "barcode": "\uf02a"},
      emojiNames: [],
      emoji: emoji.lib
    
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
    insertEmoji(emojiName) {
      let num = this.canvas_to_json_mut.text.length;
      let char = this.emoji[emojiName].char;
      let iconUnicode = this.emojiToUnicode(char);

      var emojiText = {
        x: 20,
        y: 15,
        text: char,
        fontSize: 100,
        draggable: true,
        name: `emoji_${num}`
      };
      
      this.canvas_to_json_mut.text.push(emojiText);
      this.$emit('updateCanvasToJson', this.canvas_to_json_mut);
    },
    emojiToUnicode(char) {
      if (char.length < 4) {
        return char.codePointAt(0).toString(16);
      }
      return char.codePointAt(0).toString(16) + '-' + char.codePointAt(2).toString(16);
    },
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

p {
  font-size: 2em;
  cursor: pointer;
}

p:hover {
  font-size: 2.1em;
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