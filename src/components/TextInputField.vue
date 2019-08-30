<template>
    <div>
        <input type="text" placeholder="Input Underline" v-model="textValue" v-on:input="updateTextValue">
        <span></span>
    </div>
</template>

<script>
/* eslint-disable */
import { userSession } from '../userSession'

export default {
  name: 'textInputField',
  props: ["text"],
  components: {
  },
  watch : {
      text: function(value) {
          this.textValue = value;
      }
  },
  data () {
    return {
        textValue: ""
    }
  },
  mounted() {

  },
  methods: {
    updateTextValue() {
        this.$emit('updateTextValue', this.textValue);
    }
  }
}
</script>

<style>
div {
  position: relative;
}

input {
  width: 6.5em;
  color: white;
  font-size: inherit;
  font-family: "Lato", sans-serif;
  background-color: transparent;
  border: 1px solid transparent;
  border-bottom-color: hsla(185, 100%, 62%, 0.2);
}

span {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background-color: #3cefff;
  transform-origin: bottom right;
  transform: scaleX(0);
  transition: transform 0.5s ease;
}

input:focus {
  outline: none;
}

input::placeholder {
  color: hsla(0, 0%, 100%, 0.6);
}

input:focus ~ span {
  transform-origin: bottom left;
  transform: scaleX(1);
}

</style>