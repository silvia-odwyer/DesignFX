<template>
    <ul>
      <h3>Design Templates</h3>
      <p v-on:click="createNewDesign()">Create Design</p>
      <p v-on:click="save()">Save</p>
        
      <ul>
           <li v-for="template in designTemplates" v-bind:key="template.name" v-on:click="displayTemplate(template)">
            <p>{{template.name}}</p>
            <img :src="require(`@/assets/${template.imageThumbnail}`)"/>
          </li>
          <li v-for="img in layout_imgs" v-on:click="displayLayout(img)">
            <p>{{img.layout_name}}</p>
            <img :src="img.img_src">
          </li>
      </ul>              
    </ul>
</template>

<script>
/* eslint-disable */
import { userSession } from '../userSession'
import image from "@/assets/daisies_small.jpg";
import layout1 from "@/assets/travel.png";
import layout2 from "@/assets/lemonade.png";
import layout3 from "@/assets/summer_collection.png";
import layout4 from "@/assets/travel.png";
import layout5 from "@/assets/lemonade.png";
import layout6 from "@/assets/summer_collection.png";

export default {
  name: 'designs',
  props: ['user', 'image_template', 'designTemplates', 'canvas_to_json'],
  data () {
    return {
    layout_imgs: [{img_src: layout1, layout_name: "Travel"}, {img_src: layout2, layout_name: "Lemonade"}, 
      {img_src: layout3,  layout_name: "Summer Collection"}],
    img: null,
    canvas_to_json_mut: this.canvas_to_json
    }
  },
  methods: {
    createNewDesign() {
      console.log(this.designTemplates);
    },
    displayLayout(img) {
      const image = new window.Image();
      image.src = img.img_src;
      image.onload = () => {
        // set image only when it is loaded
        this.image_template = {image: image, draggable: true, name: img.layout_name};
      };
    },
    displayTemplate(template) {
      this.canvas_to_json_mut = template;
      this.updateCanvasToJson();
    },
     updateCanvasToJson: function () {
      this.$emit('updateCanvasToJson', this.canvas_to_json_mut);
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

img {
  width: 50%;
}
</style>