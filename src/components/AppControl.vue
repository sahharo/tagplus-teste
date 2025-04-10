<template>
  <div class="app-control">
    <aside class="sidebar">
      <div class="server-actions">
        <div class="button">
          <button class="circle-button add" @click="adicionarServidor">
            <span class="material-symbols-outlined icon-add">add</span>
          </button>
          <span>Novo Servidor</span>
        </div>
        <div class="button">
          <button class="circle-button remove" @click="destruirServidor">
            <span class="material-symbols-outlined icon-remove">remove</span>
          </button>
          <span>Destruir</span>
        </div>
      </div>

      <h3>Apps disponíveis</h3>
      <div class="apps-list">
        <div v-for="app in cluster.appsDisponiveis" :key="app" class="app-item">
          <span class="app-nome">{{ app }}</span>
          <span class="app-contador">{{ contarApp(app) }}</span>
          <button
            @click="() => iniciar(app)"
            :style="{ backgroundColor: appColors[app] }"
            class="app-button"
          >＋</button>
          <button @click="encerrar(app)" class="app-button app-button-remove">－</button>
        </div>
      </div>
    </aside>

    <div class="servidores-container">
      <h1 class="titulo-servidores">Quadro de Servidores</h1> 

      <main class="servidores-grid">
  <div
    v-for="(servidor, index) in cluster.servidores"
    :key="index"
    class="servidor"
  >
    <div v-if="servidor.apps.length">
      <div
        v-for="(app, idx) in servidor.apps"
        :key="idx"
        class="app-card"
        :style="{ backgroundColor: app.cor }"
      >
        <div class="app-sigla">{{ app.sigla }}</div>
        <div class="app-nome">{{ app.nome }}</div>
        <div class="app-tempo">Added {{ calcularTempo(app.tempo) }} ago</div>
      </div>
    </div>

    <div v-else>
      <div class="app-card vazio">
        <p style="text-align: center; color: #999;">Servidor vazio</p>
      </div>
    </div>
  </div>
</main>
    </div>
  </div>
</template>


<script setup lang="ts">
import { useClusterStore, appColors } from '@/stores/cluster'
import { ref, onMounted, onUnmounted } from 'vue'

const cluster = useClusterStore()
const agora = ref(Date.now())
let intervalo: ReturnType<typeof setInterval>

onMounted(() => {
  intervalo = setInterval(() => {
    agora.value = Date.now()
    //teste de horas
    console.log('[intervalo] agora =', new Date(agora.value).toLocaleTimeString())
  }, 1000)
})

onUnmounted(() => {
  clearInterval(intervalo)
})

const calcularTempo = (inicio?: number): string => {
  if (!inicio) return '0s'
  const diff = Math.floor((agora.value - inicio) / 1000)
  const h = Math.floor(diff / 3600)
  const m = Math.floor((diff % 3600) / 60)
  const s = diff % 60

  const partes = []
  if (h > 0) partes.push(`${h}h`)
  if (m > 0) partes.push(`${m}m`)
  partes.push(`${s}s`)

  return partes.join(' ')
}

const adicionarServidor = () => {
  cluster.adicionarServidor()
}

const destruirServidor = () => {
  cluster.destruirServidor()
}

const iniciar = (app: string) => {
  cluster.iniciarApp(app)
}

const encerrar = (app: string) => {
  cluster.encerrarApp(app)
}

const contarApp = (nome: string) => {
  return cluster.servidores.reduce((total, servidor) => {
    return total + servidor.apps.filter((a) => a.nome === nome).length
  }, 0)
}
</script>

<style scoped>
.app-control {
  display: flex;
  height: 100vh;
  background-color: #1e1e1e;
  color: white;
  overflow: hidden;
}

.sidebar {
  width: 260px;
  padding: 20px;
  background-color: #2c2c2c;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.server-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 80px;
}

.button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.app-button {
  width: 34px;
  height: 34px;
  font-size: 17px;
  padding: 0;
  border-radius: 50%;
  cursor: pointer;
  align-items: center;
  border-width: 2px;
  margin-left: 4px;
  justify-content: center;
  padding: 0;
  border: 2px solid rgb(255, 255, 255);
  background-color: transparent;
}

/* .app-button.remove {
  border-color: #e53935;
  color: #e53935;
  background-color: transparent;
}
*/

.material-symbols-outlined {
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* .circle-button {
  width: 30px;
  height: 60px;
  border: none;
  font-size: 28px;
  font-weight: bold;
  border: 5px solid white;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  background-color: transparent;
  color: white;
  overflow: hidden;
  padding: 0 25px;
} */

.circle-button.add {
  border-color: #ffffff;
  border: 6px solid white;
  border-radius: 50%;
  width: 60px;
  height: 62px;
  background-color: transparent;
}

.circle-button.remove {
  border-color: #ffffff;
  color: #a7a7a7;
  border-radius: 50%;
  border: 6px solid white;
  width: 60px;
  height: 62px;
  background-color: transparent;
}

.circle-button:hover {
  box-shadow: 0 0 10px rgb(255, 255, 255);
  transition: box-shadow 0.3s ease;
}

.apps-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.app-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 8px;
  border-radius: 4px;
  background: #444;
  gap: 5px;

}

.app-nome {
  flex: 1;
}

.servidores-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(4, 200px);
  /* row-gap: 0px;
  column-gap: 10px; */
   padding: 20px; 
   gap:20px;
  justify-content: start;
  min-height: 400px; 
  background-color: #1e1e1e;
  grid-auto-rows: min-content;
}

.servidores-container {
  flex: 1;
  padding: 20px;
height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
}

.titulo-servidores {
  font-size: 25px;
  margin-bottom: 10px;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  text-align: left;
}

.servidor {
  padding: 10px;
  border-radius: 10px;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  gap: 10px;
/*margin-bottom: 20px; */
}

.app-card {
  border-radius: 10px;
  padding: 10px;
  color: rgb(255, 255, 255);
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
}

.app-card.vazio {
  background-color: #2c2c2c;
  color: #999;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 120px;
  border-radius: 12px;
  text-align: center;
  font-weight: normal;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}

.app-sigla {
  font-size: 22px;
}

.app-tempo {
  font-size: 12px;
  opacity: 0.8;
}
</style>
