import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    remisiones: []
  },
  mutations: {
    setDocumentos(state, payload) {
      state.remisiones = payload;
    }
  },
  actions: {
    //Obtener/Consultar Remisiones
    async getDocumentos({ commit }) {
      const peticion = await fetch('http://localhost:3000/documentos');
      const data = await peticion.json();
      console.log(data);
      commit('setRemisiones', data);
    },
    //Eliminar remision mediante su id
    /*async deleteDocumento({ commit }, personajes) {
      const peticion = await fetch('http://localhost:3000/users', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(remisiones))
      });
    }, */
    //Agregar Remisiones
    async setDocumentos({ commit }, remisiones) {
      const peticion = await fetch('http://localhost:3000/documentos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(remisiones)
      });
    },
    //Actualizar Remisiones
    async updateDocumentos({ commit }, remisiones) {
      const peticion = await fetch('http://localhost:3000/documentos', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(remisiones)
      });
    },

  },
  modules: {
  }
})