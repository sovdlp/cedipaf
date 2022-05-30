<template>
  <div>
    <h1>Entregas CEDI PAF SAS</h1>
    <br />

    <!-- Inicio formulario para crear las remisiones -->
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="remision"
        :rules="remisionRules"
        label="Remision"
        required
      ></v-text-field>

      <v-text-field
        v-model="cliente"
        :rules="clienteRules"
        label="Cliente"
        required
      ></v-text-field>

      <v-date-picker 
        v-model="fecha_emision"
        label="Fecha Emision"
        ></v-date-picker>

      <v-date-picker 
        v-model="fecha_entrega"
        label="Fecha Entrega"
        ></v-date-picker>
      
      <v-text-field
        v-model="transportador"
        :rules="transportadorRules"
        label="Transportador"
      ></v-text-field>

      <v-text-field
        v-model="guia_envio"
        label="Guia Envio"
      ></v-text-field>

      <v-checkbox
        v-model="checkbox"
        :rules="[(v) => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
      ></v-checkbox>

      <v-btn v-if="id==null" x-small color="primary" class="mr-4" @click="crearRemision()"
        >Agregar</v-btn
      >
      <v-btn v-if="id!=null" x-small color="primary" class="mr-4" @click="actualizarRemision(id)"
        >Actualizar</v-btn
      >
      <v-btn v-if="id!=null" x-small color="error" class="mr-4" v-on:click="btnCancelar"
        >Cancelar</v-btn
      >
      <v-btn
        :disabled="!valid"
        color="success"
        x-small
        class="mr-4"
        @click="validate"
      >
        Validate
      </v-btn>

      <v-btn color="error" x-small class="mr-4" @click="reset">
        Reset Form
      </v-btn>

      <v-btn color="warning" x-small @click="resetValidation">
        Reset Validation
      </v-btn>
    </v-form>
    <!-- Fin formulario creación de remisiones -->

    <br />

    <!-- Inicio Tabla con las remisiones (entregas) -->
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">Remision</th>
            <th class="text-center">Cliente</th>
            <th class="text-center">Fecha Emision</th>
            <th class="text-center">Fecha Entrega</th>
            <th class="text-center">Transportador</th>
            <th class="text-center">Guia Envio</th>
            <th class="text-center">Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in remisiones" :key="item._id">
            <td>{{ item.remision }}</td>
            <td>{{ item.cliente }}</td>
            <td>{{ item.fecha_emision }}</td>
            <td>{{ item.fecha_entrega }}</td>
            <td>{{ item.transportador }}</td>
            <td>{{ item.guia_envio }}</td>
            <td>{{ item.estado }}</td>
            <td>
              <v-btn
                @click="btnActualizar(item._id, item.remision, item.cliente, item.fecha_emision, item.fecha_entrega, item.transportador, item.guia_envio, item.estado)"
                color="primary"
                elevation="12"
                rounded
                x-small
                class="mr-4"
                >Actualizar</v-btn
              >
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <!-- Fin tabla remisiones -->
  </div>
</template>

<script>
import store from "../store/index.js";
export default {
  data: () => ({
    valid: true,
    remision: "",
    remisionRules: [
      (v) => !!v || "# Remision es obligatorio",
    ],
    cliente: "",
    clienteRules: [
      (v) => !!v || "Nombre Cliente es obligatorio",
    ],
    transportador: "",
    transportadorRules: [(v) => !!v || "Transportador es obligatorio"],
    
    checkbox: false,
    id: null,
  }),
  methods: {
    crearRemision() {
      let obj = {
        remision: this.remision,
        cliente: this.cliente,
        fecha_emision:this.fecha_emision,
        transportador: this.transportador,
        guia_envio: this.guia_envio,
        estado: this.estado,
      };
      store.dispatch("setRemisiones", obj).then(() => {
        store.dispatch("getRemisiones");
        this.$refs.form.reset();
      });
    },
    actualizarRemision(id) {
      let obj = {
        id: id,
        remision: this.remision,
        cliente: this.cliente,
        fecha_emision:this.fecha_emision,
        fecha_entrega:this.fecha_entrega,
        transportador: this.transportador,
        guia_envio: this.guia_envio,
        estado: this.estado,
      };
      store.dispatch("updateRemisiones", obj).then(() => {
        store.dispatch("getRemisiones");
        this.$refs.form.reset();
        this.id = null;
      });
    },
    btnActualizar(id, remision, cliente, fecha_emision, fecha_entrega, transportador, guia_envio, estado){
      this.id = id;
      this.remision = remision;
      this.cliente = cliente;
      this.fecha_emision = fecha_emision;
      this.fecha_entrega = fecha_entrega;
      this.transportador = transportador;
      this.guia_envio = guia_envio;
      this.estado = estado;
    },
    btnCancelar(){
      this.id = null;
      this.$refs.form.reset();
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
  created: () => {
    //dispatch: accede a las acciones del store
    store.dispatch("getRemisiones");
  },
  computed: {
    remisiones: () => {
      return store.state.remisiones;
    },
  },
};
</script>

<style>
</style>