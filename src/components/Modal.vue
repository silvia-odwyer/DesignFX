<template>
 <transition name="modal">
    <div class="modal-filter">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              Not Saved
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              The changes you have made will not be saved. 
            </slot>
          </div>

          <div class="modal-cta">
            <slot name="cta">
                Do you want to continue?
              <button class="modal-default-button" @click="$emit('close')">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
/* eslint-disable */
import { userSession } from '../userSession'

export default {
  name: 'modal',
  props: [],
  data () {
    return {
    }
  },
  methods: {
   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.modal-filter {
  position: fixed;
  z-index: 9998;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .5);
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-body {
  margin: 20px 0;
}

h3 {
    color: black;
}
.modal-default-button {
  float: right;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

</style>