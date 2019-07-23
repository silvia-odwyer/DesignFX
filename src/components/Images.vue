<template>
    <ul>
          
    <h3>Images</h3>
    <ul>
        <li v-on:click="addImage(layout_imgs[0])">Add Image</li>

        <h5>Upload Image </h5>
        <li>
            <input v-on:change="uploadImage()" class="file-input" type="file" id='img_uploader' name="upload-image">
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label">
                    Choose an image...
                  </span>
                </span>

        </li>
        <img v-for="user_img in user_images" :src="user_img.img_src" v-on:click="addImage(user_img)">


        <canvas id="canvas"></canvas>

        <button v-on:click="saveToBlockstack">Save To Blockstack</button>

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
        img: null,
        layout_imgs: [{img_src: layout1, layout_name: "Travel"}, {img_src: layout2, layout_name: "Lemonade"}, 
        {img_src: layout3,  layout_name: "Summer Collection"}],
        user_images: [],
        img_num: 0
    }
  },
  mounted() {
      this.fetchData();
  },
  methods: {
    addImage(img) {
      let app = this;
      var imageObj = new Image();
      imageObj.onload = function() {
        let img_obj = {image: imageObj, draggable: true, name: img.layout_name}
        app.images.push(img_obj);
        app.allShapes.push(img_obj);
      }
      imageObj.src = img.img_src;
    },
    uploadImage() {
        let app = this;
        let file = document.getElementById("img_uploader").files[0];

        let reader = new FileReader();
        reader.onloadend = function () {
            let img_src = reader.result; // Set the global image to the path of the file on the client's PC.
            let img_obj = {img_src: img_src, layout_name: `img_${app.img_num}`};
            app.user_images.push(img_obj);
            console.log(reader.result);
            app.img_num += 1;
        }
        if (file) {
            reader.readAsDataURL(file);
        } else {
            /// Error message TODO
            console.log("Could not read file. :(")
        }
    },
    saveToBlockstack() {
        console.log("save to blockstack");
        let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d");

        for (var i = 0; i < this.user_images.length; i++) {
            let image = this.user_images[i];

            var imageElem = new Image();
            imageElem.onload = () => {
                context.drawImage(imageElem, 0, 0);
                var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

                var array = imageData.data; // array is a Uint8ClampedArray
                var buffer = imageData.data.buffer; // buffer is a ArrayBuffer
                        
                userSession.putFile("image1.PNG", buffer);
            }
            imageElem.src = image.img_src;
        }

    },
    fetchData() {
        userSession.getFile("image1.PNG") // decryption is enabled by default
         .then((buffer) => {
             let app = this;
          var canvas = document.createElement("canvas");
          var context = canvas.getContext("2d");
          var imageData2 = context.createImageData(canvas.width, canvas.height);
          imageData2.data.set(buffer);
          console.log(imageData2);
          context.putImageData(imageData2, 0, 0);
          
          let uri = canvas.toDataURL();
          let canvasToImg = new Image();

          canvasToImg.onload = () => {
            let img_obj = {img_src: uri, layout_name: `img_${app.img_num}`};
            app.user_images.push(img_obj);
          }
          canvasToImg.src = uri;

        })
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