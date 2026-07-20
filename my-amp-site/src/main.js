import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router' // 🟢 新增：引入我們剛建立的 router 設定

const app = createApp(App) // 把它抽出來變成 app 變數

app.use(router) // 🟢 新增：註冊 Vue Router

app.mount('#app')