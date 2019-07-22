<template>
    <ul>
          
    <h3>Text</h3>
    <ul>
        <li v-on:click="addText">Draw Text</li>
    </ul>              
    </ul>
</template>

<script>
/* eslint-disable */
import { userSession } from '../userSession'
import image from "@/assets/daisies_small.jpg";


export default {
  name: 'designs',
  props: ['user', 'text', 'allShapes'],
  data () {
    return {
    img: null
    }
  },
  methods: {
    addText() {
      let name = `text_node${this.text.length + 1}`
      
      let simpleText = {
        x: 50,
        y: 50,
        text: 'Simple Text',
        fontSize: 100,
        fontFamily: 'Calibri',
        fill: 'white',
        draggable: 'true',
        name: name
      };
    this.text.push(simpleText);

    this.allShapes.push(simpleText);
    
    },
    displayLayout(img) {
      const image = new window.Image();
      image.src = img.img_src;
      image.onload = () => {
        // set image only when it is loaded
        this.image_template = {image: image, draggable: true, name: img.layout_name};
      };
    },
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
    },

    signOut () {
      userSession.signUserOut(window.location.href)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

ul li {
  text-decoration: none;
  list-style: none;
  padding-right: 4em;
  cursor: pointer;
  color: silver;
  font-family: "Helvetica Neue", sans-serif;
}


</style>