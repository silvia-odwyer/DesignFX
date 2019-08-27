<template>
    <div>
      <h3>Images</h3>
      <ul>
          <li>
            <label class="custom-file-upload file-input" name="upload-image">
                <input type="file" id="img_uploader" v-on:change="uploadImage()"/>
                Upload Image
                <span class="file-cta">
                    <span class="file-icon">
                      <i class="fas fa-upload"></i>
                    </span>
                  </span>
            </label>
          </li>
          
          <div class="img_templates">
            <img v-for="user_img in user_images" :src="user_img.image.src" v-on:click="addImage(user_img)">
          </div>

          <canvas id="canvas"></canvas>

          <button v-on:click="saveToBlockstack">Save To Blockstack</button>

      </ul>              
    </div>
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
  name: 'images',
  props: ['user', 'allShapes', 'canvas_to_json'],
  data () {
    return {
        img: null,
        layout_imgs: [{img_src: layout1, layout_name: "Travel"}, {img_src: layout2, layout_name: "Lemonade"}, 
        {img_src: layout3,  layout_name: "Summer Collection"}],
        user_images: [],
        img_num: 0,
        canvas_to_json_mut: this.canvas_to_json
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    addImage(img) {
      let img_obj = {image: img.image, draggable: true, name: img.layout_name}

      this.allShapes.push(img_obj);
      this.canvas_to_json_mut.images.push(img_obj);
      this.$emit('updateCanvasToJson', this.canvas_to_json_mut);
    },
    uploadImage() {

        let app = this;
        let file = document.getElementById("img_uploader").files[0];
        console.log(file);
        let reader = new FileReader();  
        reader.onloadend = function () {
            let img_src = reader.result; // Set the global image to the path of the file on the client's PC.

            // Create an Image element using this info
            var newImg = new Image();

            newImg.onload = () => {
                let img_obj = {image: newImg, layout_name: `img_${app.img_num}`};
                console.log(newImg);
                app.user_images.push(img_obj);
                app.img_num += 1;
                console.log(app.user_images);
            };
            newImg.src = img_src;
            
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
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");

        let image = this.user_images[0];
        console.log("saveblkstk: ", image);

        let imageElem = image.image;
        canvas.width = imageElem.width;
        canvas.height = imageElem.height;

        console.log("canvas.width", imageElem.width);
        context.drawImage(imageElem, 0, 0);
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

        var buffer = imageData.data.buffer; // buffer is a ArrayBuffer
        console.log("height and width", imageElem.height);
        console.log("imagedata", imageData);
        userSession.putFile("image1.PNG", buffer);
    },
    fetchData() {
      //TODO 
      // Create a data structure, which contains the image name, width, and height.
        userSession.getFile("image1.PNG") // decryption is enabled by default
         .then((buffer) => {
           console.log("buffer", buffer)
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
                let img_obj = {image: canvasToImg, draggable: true, layout_name: `img_${app.img_num}`};
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

input[type="file"] {
    display: none;
}

.custom-file-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
}

.img_templates {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 5vh;
}

.img_templates img {
  flex: 1 0 33%;
  padding: 0 0.5vh;
  cursor: pointer;
}

</style>