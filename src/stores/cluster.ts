import { defineStore } from "pinia";

interface App {
  nome: string;
  cor: string;
  sigla: string;
  tempo: number;
}

interface Servidor {
  id: number;
  apps: App[];
  cor: string;
}

// cores de cada um dos apps
export const appColors: Record<string, string> = {
  Hadoop: "#ec38bc",
  Rails: "#4f46e5",
  Chronos: "#0284c7",
  Storm: "#06b6d4",
  Spark: "#22c55e",
};

const serverColors = ["#ec38bc", "#4f46e5", "#0284c7", "#06b6d4", "#22c55e"]; 
export const useClusterStore = defineStore("cluster", {
  state: () => ({
    servidores: [] as Servidor[],
    appsDisponiveis: ["Hadoop", "Rails", "Chronos", "Storm", "Spark"], //nomes dos serv
  }),

  actions: {
    adicionarServidor() {
      if (this.servidores.length >= 50) return; //pode add ate 50 servidores

      const cor = serverColors[this.servidores.length % serverColors.length];
      const novoServidor: Servidor = {
        id: Date.now(),
        apps: [],
        cor,
      };

      this.servidores.push(novoServidor);
    },

    destruirServidor() {
      const ultimo = this.servidores.pop();
      if (!ultimo) return;

      ultimo.apps.forEach((app) => {
        this.iniciarApp(app.nome);
      });
    },

    iniciarApp(nomeApp: string) {
      const cor = appColors[nomeApp] || "#ffffff";
      const novoApp: App = {
        nome: nomeApp,
        cor,
        sigla: nomeApp.slice(0, 2).toUpperCase(),
        tempo: Date.now(),
      };
      //pra chamar o serv sem nd
      const slotVazio = this.servidores.find((s) => s.apps.length === 0);
      if (slotVazio) {
        slotVazio.apps.push(novoApp);
        return;
      }
      //chama o serv com um app
      const slotComUm = this.servidores.find((s) => s.apps.length === 1);
      if (slotComUm) {
        slotComUm.apps.push(novoApp);
        return;
      }
    },

    encerrarApp(nomeApp: string) {
      for (let i = this.servidores.length - 1; i >= 0; i--) {
        const servidor = this.servidores[i];
        const idx = servidor.apps.findIndex((a) => a.nome === nomeApp);
        if (idx !== -1) {
          servidor.apps.splice(idx, 1);
          return;
        }
      }
    },
  },
});
