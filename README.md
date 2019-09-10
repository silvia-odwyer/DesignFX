# Graphic Design App

A graphic design app, with decentralized storage, and pre-built templates. 

This app allows you to create graphics, complete with elements, text, and imagery, and resize these graphics 
for social media and beyond. 

![DesignFX In Action](https://i.imgur.com/DCfRs7e.gif "DesignFX in action")

Features:
- **Elements**: Select from a number of elements and customize them to your liking.
- **Save/export** final graphics, and design layouts as JSON and with Blockstack.
- **Pre-built templates** allows for faster designing

Dev Notes:
- Built with Vue, Vuex, and Vue Router. 
- Decentralized storage uses Blockstack for the saving of images.

### Work-in-Progress
This app is still a work-in-progress, therefore there will still be bugs until they are smoothed out and fixed.
There are a limited number of templates, but a whole range are coming soon.

## Build Setup
``` bash
# install dependencies
# previously we used yarn install. This is no longer supported.
npm install

# Compiles and hot-reloads for development
npm run serve

# Compiles and minifies for production
npm run build
```
## Linting & Unit test

``` bash
# Lints and fixes files
npm run lint

# Run your unit tests
npm run test:unit
```