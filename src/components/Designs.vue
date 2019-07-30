<template>
    <ul>
      <h3>Design Templates</h3>
      <p v-on:click="createNewDesign()">Create Design</p>
      <p v-on:click="save()">Save</p>
        
      <ul class="img_templates">
           <li v-for="(template, index) in designTemplates" v-bind:key="template.name" v-on:click="displayTemplate(index)">
            <p>{{template.name}}</p>
            <img :src="require(`@/assets/${template.imageThumbnail}`)"/>
          </li>
      </ul>              
    </ul>
</template>

<script>
/* eslint-disable */
import {cloneDeepWith} from "lodash-es";
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
    canvas_to_json_mut: this.canvas_to_json,
    designImageLinks: {"Travel" : layout4, "Lemonade": layout2, "The Summer Collection" : layout3}
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
    displayTemplate(template_index) {

      var template_copy = cloneDeepWith(this.designTemplates[template_index]);
      this.canvas_to_json_mut = template_copy;

          // Create an Image element using this info
        var newImg = new Image();
        var app = this;
        newImg.onload = () => {
          let img_obj = {image: newImg, draggable: true, name: "img1_image"};
          app.canvas_to_json_mut.images.push(img_obj);
          console.log("imgs", app.canvas_to_json.images);
          app.updateCanvasToJson();
        };
        newImg.src = this.designImageLinks[template_copy.name];
    },
     updateCanvasToJson: function () {
       console.log("UPDATE CANVAS TO JSON", this.canvas_to_json_mut);
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

.img_templates {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>