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
        <article class="imgs">
          <div v-for="user_img in user_images" class="img">
            <img :src="user_img.img_src" v-on:click="addImage(user_img)">
            <a @click.prevent="deleteImage(user_img)" class="delete pull-right" href="#">x</a> 

          </div>

        </article>

        <LoadingAnimation v-if="!imagesLoaded"></LoadingAnimation>

    </ul>              
    </div>
</template>

<script>
/* eslint-disable */
import { userSession } from '../userSession'
import image from "@/assets/daisies_small.jpg";
import LoadingAnimation from "@/components/LoadingAnimation.vue";

var IMAGE_LIST_FILE = "image_list.json";

export default {
  name: 'designs',
  props: ['user', 'allShapes', 'canvas_to_json', 'selectedNode'],
  data () {
    return {
        img: null,
        user_images: [],
        img_num: 0,
        images: [],
        imageList: [],
        blockstack: window.blockstack,
        uidCount: 0,
        canvas_to_json_mut: this.canvas_to_json,
        imagesLoaded: false
    }
  },
  mounted() {
      this.fetchImageList();
  },
  components: {
    LoadingAnimation
  },
  watch: {
    imageList: {
      handler: function (imageList) {
        // encryption is now enabled by default
        return userSession.putFile(IMAGE_LIST_FILE, JSON.stringify(imageList) );
      },
      deep: true
    },
    canvas_to_json: function(canvas_to_json) {
      this.canvas_to_json_mut = canvas_to_json;
    }
  },
  methods: {
    addImage(img) {
      let app = this;
      var imageObj = new Image();
      
      imageObj.onload = function() {
        let name = img.name + app.img_num;
        let img_obj = {image: imageObj, draggable: true, name: name}
        
        app.allShapes.push(img_obj);
        app.canvas_to_json_mut.images.push(img_obj);

        app.$emit('updateCanvasToJson', app.canvas_to_json_mut);
        app.img_num++;
      }
      imageObj.src = img.img_src;
    },
    uploadImage() {
        let app = this;
        let file = document.getElementById("img_uploader").files[0];
        let reader = new FileReader();
        reader.onloadend = function () {
            let img_src = reader.result; // Set the global image to the path of the file on the client's PC.
            let img_obj = {img_src: img_src};
            app.user_images.push(img_obj);
            app.img_num += 1;
            app.addToImageList(img_obj);
        }
        if (file) {
            reader.readAsDataURL(file);
        } else {
            /// Error message TODO
            console.log("Could not read file. :(")
        }


    },
    fetchImageList() {
      console.log("fetching image list");
      userSession.getFile(IMAGE_LIST_FILE)
        .then((imageList) => {
          var images = JSON.parse(imageList || '[]')
          this.imageList = images;
          this.uidCount = images.length;
          
          // Now that we have the image names, we can fetch each individual image.
          this.fetchImages();
          })

    },
    fetchImages() {
        // No images to fetch
        if (this.imageList.length == 0) {
            this.imagesLoaded = true;
        }
        else {
          for (let i = 0; i < this.imageList.length; i++) {
              let image_name = this.imageList[i].name; 
              let app = this;
              
              userSession.getFile(image_name) // decryption is enabled by default
                    .then((buffer) => {
                      if (buffer != null) {

                          var canvas = document.createElement("canvas");
                          var context = canvas.getContext("2d");
                          var imageData = context.createImageData(canvas.width, canvas.height);
                          imageData.data.set(buffer);
                          context.putImageData(imageData, 0, 0);

                          let uri = canvas.toDataURL();

                          let canvasToImg = new Image();
                          canvasToImg.onload = () => {

                            let img_obj = {img_src: uri, name: image_name};
                            app.user_images.push(img_obj);
                            
                            // Check if on last iteration
                            if (i == app.imageList.length - 1) {
                              app.imagesLoaded = true;
                            }
                          }
                          canvasToImg.src = uri;
                      }
                      else {
                        // Check if on last iteration
                        if (i == app.imageList.length - 1) {
                            app.imagesLoaded = true;
                        }
                      }
                      
                    })
          }
        }  
    },
    addToImageList(img_obj) {
      // img_obj contains the image source as base64
      let random_id = this.genRandomID();
      let name = `IMAGE_${random_id}.PNG`;

      this.imageList.unshift({
        id: random_id,
        name: name
      });

      img_obj.name = name;
  
      this.uploadImageToBlockstack(img_obj);
    },
    uploadImageToBlockstack(img_obj) {
      let canvas = document.createElement("canvas");
      let context = canvas.getContext("2d");
      
      var imageElem = new Image();
      
      imageElem.onload = () => {
          context.drawImage(imageElem, 0, 0);
          var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          var buffer = imageData.data.buffer; // buffer is a ArrayBuffer
          let uri = canvas.toDataURL();
          userSession.putFile(img_obj.name, buffer)
          .then(() => {
                console.log("UPLOADED TO BLOCKSTACK")
          });
      }
      imageElem.src = img_obj.img_src;
    },
    deleteImage(img) {
      // remove from image list 
      this.imageList.splice(this.imageList.indexOf(img), 1);

      this.user_images.splice(this.user_images.indexOf(img), 1);

      console.log("DELETING", img.name);

      userSession.deleteFile(img.name)
        .then(() => {
          console.log("DELETED IMAGE SUCCESSFULLY");
      })
    },
    getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    genRandomID() {
      let random_id = "";
      let ID_LENGTH = 10;
      let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
      for (var j = 0; j < ID_LENGTH; j++) {
        let ran_num = this.getRandomNumber(0, alphabet.length - 1);
        let letter = alphabet[ran_num];
        random_id += letter;
      }

      return random_id;
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

.custom-file-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
}

.imgs {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 5vh;
}

.imgs div {
  flex: 1 0 39%;
  padding: 0 0.5vh;
  cursor: pointer;
}

.img {
  display: flex;
}

.imgs div img {
  height: 100%;
  width: 100%;
}

.delete {
		display: inline;
		color: grey;
		&:hover {
			text-decoration: none;
			color: red;
		}
	}

</style>