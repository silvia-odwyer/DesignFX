<template>
    <ul>
          
    <h3>Elements</h3>
    <ul>
        <li v-on:click="addRectangle('red')">Add Red Rectangle</li>
        <li v-on:click="addRectangle('green')">Add Green Rectangle</li>
        <li v-on:click="addText()">Add Text</li>
        <li v-on:click="addImage(layout_imgs[0])">Add Image</li>
        <li v-on:click="save()">Save</li>
        <li v-on:click="clear()">Clear</li>
    </ul>              
    </ul>
</template>

<script>
/* eslint-disable */
import { userSession } from '../userSession'

export default {
  name: 'elements',
  props: ['user'],
  data () {
    return {
    }
  },
  methods: {
    
    fetchData () {
      userSession.getFile(STORAGE_FILE) // decryption is enabled by default
        .then((todosText) => {
          var notes = JSON.parse(todosText || '[]')
          notes.forEach(function (note, index) {
            note.id = index
          })
          this.uidCount = notes.length
          this.notes = notes
        })

      // userSession.getFile("image1.PNG") // decryption is enabled by default
      //   .then((buffer) => {
      //     var canvas = document.getElementById("canvas");
      //     var context = canvas.getContext("2d");
      //     var imageData2 = context.createImageData(canvas.width, canvas.height);
      //     imageData2.data.set(buffer);
      //     console.log(imageData2);

      //     context.putImageData(imageData2, 0, 0);

      //   })
    },

    signOut () {
      userSession.signUserOut(window.location.href)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>