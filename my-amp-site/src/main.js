import { createApp } from 'vue'
import { createHead } from '@unhead/vue/client'
import './style.css'
import App from './App.vue'
import router from './router' // 🟢 新增：引入我們剛建立的 router 設定

const app = createApp(App) // 把它抽出來變成 app 變數

app.use(router) // 🟢 新增：註冊 Vue Router
app.use(createHead()) // 註冊 unhead，useHead() 才會生效（動態 title / meta）

app.mount('#app')