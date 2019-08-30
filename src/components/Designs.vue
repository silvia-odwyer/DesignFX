<template>
    <article>
      <div class="img_templates">
           <div v-for="(template, index) in designTemplates" v-bind:key="template.name" v-on:click="displayTemplate(index)">
            <img :src="require(`@/assets/${template.imageThumbnail}`)"/>
          </div>
      </div>              
    </article>
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
import layout7 from "@/assets/stockholm.png";

export default {
  name: 'designs',
  props: ['user', 'image_template', 'designTemplates', 'canvas_to_json', 'transformer', 'changesMade'],
  data () {
    return {
    img: null,
    canvas_to_json_mut: this.canvas_to_json,
    designImageLinks: {"Travel" : layout4, "Lemonade": layout2, "The Summer Collection" : layout3, "Stockholm": layout7}
    }
  },
  methods: {
    createNewDesign() {
      this.removeTransformer();
      console.log(this.designTemplates);
      this.canvas_to_json_mut = {
        elements: {
          rectangles: [],
          circles: [],
          lines : [],
          ellipses: [],
        },
        text: [],
        images: [],
        background: {},
        backgroundColor: "#FFFFFF"
      }
      this.$emit('updateCanvasToJson', this.canvas_to_json_mut);
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
      console.log("changes made", this.changesMade);
      if (this.changesMade) {
        this.$emit('toggleModal');
      }
      this.removeTransformer();
      var template_copy = cloneDeepWith(this.designTemplates[template_index]);
      this.canvas_to_json_mut = template_copy;
      this.updateCanvasToJson();
        console.log("feature image", template_copy.featureImage);
        if (template_copy.featureImage.name !=  "") {
          // Create an Image element using this info
          var newImg = new Image();
          var app = this;
          newImg.onload = () => {
            let img_obj = {image: newImg, draggable: true, name: "img1_image"};
            app.canvas_to_json_mut.images.push(img_obj);
            console.log("imgs", app.canvas_to_json.images);
            app.updateCanvasToJson();
            
            // Reset changes made back to false, since this is a new design.
            this.$emit("editChangesMade", false);
          };
          newImg.src = this.designImageLinks[template_copy.name];
        }

        // Reset changes made back to false, since this is a new design.
        this.$emit("editChangesMade", false);
    },
    loadImage() {
      if (template_copy.imageThumbnail != "" ) {
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
      }
    },
     updateCanvasToJson: function () {
       console.log("UPDATE CANVAS TO JSON", this.canvas_to_json_mut);
      this.$emit('updateCanvasToJson', this.canvas_to_json_mut);
    },
    removeTransformer() {
      const transformerNode = this.transformer.getStage();
      const stage = transformerNode.getStage();
      // Detach current node from the transformer
      transformerNode.detach();
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
  width: 100%;
}

.img_templates {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 5vh;
}

.img_templates div {
  flex: 1 0 33%;
  padding: 0 0.5vh;
  cursor: pointer;
}

.img_templates div:hover {
  color: whitesmoke;
}

.img_templates img {

}
</style>