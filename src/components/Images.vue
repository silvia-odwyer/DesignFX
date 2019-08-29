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
        <article class="img_templates">
          <img v-for="user_img in user_images" :src="user_img.img_src" v-on:click="addImage(user_img)">
        </article>

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

var IMAGE_LIST_FILE = "image_list.json";

export default {
  name: 'designs',
  props: ['user', 'allShapes'],
  data () {
    return {
        img: null,
        layout_imgs: [{img_src: layout1, layout_name: "Travel"}, {img_src: layout2, layout_name: "Lemonade"}, 
        {img_src: layout3,  layout_name: "Summer Collection"}],
        user_images: [],
        img_num: 0,
        images: [],
        imageList: [],
        uidCount: 0
    }
  },
  mounted() {
      this.fetchData();
      this.fetchImageList();
  },
  watch: {
    imageList: {
      handler: function (imageList) {
        // encryption is now enabled by default
        return userSession.putFile(IMAGE_LIST_FILE, JSON.stringify(imageList) );
      },
      deep: true
    }
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
    fetchData() {
        userSession.getFile("image1.PNG") // decryption is enabled by default
         .then((buffer) => {
             let app = this;
          var canvas = document.createElement("canvas");
          var context = canvas.getContext("2d");
          var imageData2 = context.createImageData(canvas.width, canvas.height);
          imageData2.data.set(buffer);
          context.putImageData(imageData2, 0, 0);
          
          let uri = canvas.toDataURL();
          let canvasToImg = new Image();
          canvasToImg.onload = () => {
            let img_obj = {img_src: uri, layout_name: `img_${app.img_num}`};
            app.user_images.push(img_obj);
          }
          canvasToImg.src = uri;
        })
    },
    fetchImageList() {
      console.log("fetching image list");
      userSession.getFile(IMAGE_LIST_FILE)
        .then((imageList) => {
          var images = JSON.parse(imageList || '[]')
          this.imageList = images;
          this.fetchImages();
        })

    },
    fetchImages() {
      for (let i = 0; i < this.imageList.length; i++) {
        let image_name = this.imageList[i].name;
        console.log("FETCHING IMAGE", image_name);
        userSession.getFile(image_name) // decryption is enabled by default
         .then((buffer) => {
           if (buffer == null) {
             console.log("NULL")
           }
           else {
            let app = this;
            var canvas = document.createElement("canvas");
            var context = canvas.getContext("2d");
            var imageData2 = context.createImageData(canvas.width, canvas.height);
            imageData2.data.set(buffer);
            context.putImageData(imageData2, 0, 0);
            
            let uri = canvas.toDataURL();
            let canvasToImg = new Image();
            canvasToImg.onload = () => {
              let img_obj = {img_src: uri, layout_name: `img_${app.img_num}`};
              app.user_images.push(img_obj);
            }
            canvasToImg.src = uri;
           }

        })
        .catch("there was an error")
      }
    },
    addToImageList(img_obj) {
      let id_num = this.uidCount;
      this.uidCount++;
      console.log("id num", id_num);

      let name = `IMAGE_${id_num}.PNG`;
      this.imageList.unshift({
        id: this.uidCount++,
        name: name
      });

      console.log(this.imageList);
      this.uploadImageToBlockstack(name, img_obj);
    },
    uploadImageToBlockstack(img_name, img_obj) {
      let canvas = document.createElement("canvas");
      let context = canvas.getContext("2d");
      
      var imageElem = new Image();
      
      imageElem.onload = () => {
          context.drawImage(imageElem, 0, 0);
          var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          var buffer = imageData.data.buffer; // buffer is a ArrayBuffer
                        
          userSession.putFile(img_name, buffer);
      }
      imageElem.src = img_obj.img_src;
    },
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

.img_templates {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 5vh;
}


</style>