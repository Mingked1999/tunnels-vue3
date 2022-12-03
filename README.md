# VUE3 BASED TUNNELS MANAGEMENT SYSTEM

- frontend start: npm run dev
- backend start -> cd ./server: node/nodemon index.js

![image](https://res.cloudinary.com/practicaldev/image/fetch/s--vbEQHpsU--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/vg0v5vm9a0c1ix6mdp9s.png)

## MODULE USED IN THIS PROJECT Frontend

- VUE-ROUTER4.X: npm install vue-router@4
- AXIOS: npm install axios --save
- Pinia (replace VUEX): npm install pinia --save
- Pinia Persist: npm install pinia-plugin-persist --save
- echarts: npm install echarts --save
- vue-i18n(language switch): npm install --save vue-i18n@next
- element-plus: npm install element-plus --save
- element-plus icon: npm install @element-plus/icons-vue
- On-demand Import: npm install -D unplugin-vue-components unplugin-auto-import

## MODULE USED IN THIS PROJECT server

- localhost server: npm install --save express //network module
- npm install body-parser //make POST requests query-string
- cors: npm install --save cors //solve proxy problem in backend
- npm install --save mysql
- npm install --save jsonwebtoken //token generator
- npm install -g nodemon //node change detection tool

## Project Setup

- npm init vue@latest
- npm install

## ROUTING LOGIC

``` JavaScript
//Dashboard TWO PARTS: ONE PANEL ON THE LEFT, ANOTHER CONTENT ON THE RIGHT
//CLICKING PANEL CONTENT TO SWITCH RIGHT HAND SIDE CONTENT 
//routing to Layout.vue
//Layout has children of content/page switching
```
