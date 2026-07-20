import { createRouter, createWebHistory } from 'vue-router'
import ProjectView from '../views/ProjectView.vue' // 我們等下會把 App.vue 的內容搬過去

const routes = [
  {
    // 首頁，預設會重導向到你的第一個專案（例如 'bio'）
    path: '/',
    redirect: '/project/bio'
  },
  {
    // 這個設定超重要！它會把網址後面的 id 變成變數
    // 例如網址是 /project/2a3，那 route.params.id 就會是 '2a3'
    path: '/project/:id',
    name: 'Project',
    component: ProjectView
  },
  {
    // 捕捉所有未知的網址，導回首頁
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  // 啟動 History 模式，消除網址中的 #
  history: createWebHistory(),
  routes
})

export default router