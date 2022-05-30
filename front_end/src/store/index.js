import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    remisiones: []
  },
  mutations: {
    setRemisiones(state, payload) {
      state.remisiones = payload;
    }
  },
  actions: {
    //Obtener/Consultar Remisiones
    async getDocumentos({ commit }) {
      //const peticion = await fetch('https://futuramaapi.herokuapp.com/api/v2/characters');
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
    async setRemisiones({ commit }, remisiones) {
      const peticion = await fetch('http://localhost:3000/documentos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(remisiones)
      });
    },
    //Actualizar Remisiones
    async updateRemisiones({ commit }, remisiones) {
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