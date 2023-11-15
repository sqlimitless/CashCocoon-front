/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import axios from 'axios'
// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)
axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.withCredentials = true;
app.config.globalProperties.axios=axios;
app.config.globalProperties.foo = 'bar';
registerPlugins(app)

app.mount('#app')
