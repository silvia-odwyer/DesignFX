<template>
    <ul>
          
    <h3>Images</h3>
    <ul>
        <li v-on:click="addImage(layout_imgs[0])">Add Image</li>
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
  props: ['user', 'allShapes', 'images'],
  data () {
    return {
    img: null
    }
  },
  methods: {
    addImage(img) {
      console.log("this.images", this.images);
      let app = this;
      console.log("add image")
      var imageObj = new Image();
      imageObj.onload = function() {
        let img_obj = {image: imageObj, draggable: true, name: img.layout_name}
        app.images.push(img_obj);
        app.allShapes.push(img_obj);
      }
      imageObj.src = img.img_src;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>