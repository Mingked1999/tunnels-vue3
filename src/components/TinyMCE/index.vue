<template>
    <editor v-model="textContent" :init="init"></editor>
</template>
<script setup>
import tinymce from 'tinymce/tinymce'
import editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver/theme'
import 'tinymce/icons/default'
import 'tinymce/models/dom'
//https://www.tiny.cloud/docs/plugins/
import 'tinymce/plugins/image' // 插入上传图片插件
import "tinymce/plugins/importcss"; //图片工具
import 'tinymce/plugins/media' // 插入视频插件
import 'tinymce/plugins/table' // 插入表格插件
import 'tinymce/plugins/lists' // 列表插件
import "tinymce/plugins/charmap"; // 特殊字符
import 'tinymce/plugins/wordcount' // 字数统计插件
import "tinymce/plugins/codesample"; // 插入代码
import "tinymce/plugins/code"; // 查看源码
import "tinymce/plugins/fullscreen"; //全屏
import 'tinymce/plugins/link' //
import 'tinymce/plugins/preview' // 预览
import "tinymce/plugins/template"; //插入模板
import 'tinymce/plugins/save' // 保存
import "tinymce/plugins/searchreplace"; //查询替换
import "tinymce/plugins/pagebreak"; //分页
import "tinymce/plugins/insertdatetime"; //时间插入
import api from '@/api/index.js'
import { reactive, ref, watch, onMounted } from "vue"

const textContent = ref("")
const props = defineProps({
  value: {
    type: String,
    default: ''
    },
    options:{
        type:Object,
        default:()=>{}
    },
    remark:{
        type:String,
        default:''
    },
    editorId:{
        type:[String,Number],
        default:0
    },
    plugins: {
    type: [String, Array],
    default: 'lists image media table wordcount save preview' //list order
   },
  toolbar: {
    type: [String, Array],
    default: 'undo redo |  formatselect | bold italic underline strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent blockquote | lists image media table | codesample code removeformat save preview'
    // default: 'formats undo redo paste print fontsizeselect fontselect template fullpage|wordcount ltr rtl visualchars visualblocks toc spellchecker searchreplace|save preview pagebreak nonbreaking|media image|outdent indent aligncenter alignleft alignright alignjustify lineheight  underline quicklink h2 h3 blockquote numlist bullist table removeformat forecolor backcolor bold italic  strikethrough hr charmap link insertdatetime|subscript superscript cut codesample code |anchor preview fullscreen|help'
   }
})

const init = reactive({
  width: props.options.width,
  height: props.options.height,
  skin_url:'node_modules/tinymce/skins/ui/oxide',
  // skin_url: 'node_modules/tinymce/skins/ui/oxide-dark',//dark theme
  plugins: props.plugins,
  toolbar: props.toolbar,
  content_css: 'node_modules/tinymce/skins/content/default/content.css',
  branding: false,
  menubar: false, // hide menubar
  statusbar: true,  // hide status bar
  init_instance_callback: (editor) => {
    console.log("initialisation finished: ", editor)
   },
  // image in format base64
  // upload in ajax way-> https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
  images_upload_handler: (blobInfo, success, failure) => {
    const img = 'data:image/jpeg;base64,' + blobInfo.base64()
    console.log("Upload Image: ", img)
    success(img)
   }
})

const emit = defineEmits(["writeRemark"])
watch(props.value,(newValue,oldValue) =>{
  textContent.value = newValue
})
watch(textContent,(newValue,oldValue) =>{
  emit("writeRemark",newValue)
})
onMounted(()=>{
  //init tinymce
  tinymce.init({})
  api.PreProject({id:props.editorId}).then(res=>{
    if(res.data.status==200){
        textContent.value = res.data.result.remark
    }
  }).catch(err=>{
    console.log(err)
  })
})

</script>