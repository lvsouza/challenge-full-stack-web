<template>
  <v-card outlined class="pa-4" maxWidth="600px" minWidth="200px">
    <validation-observer ref="observer">
      <form>
        <validation-provider v-slot="{ errors }" rules="required" name="Name">
          <v-text-field
            :dense="$vuetify.breakpoint.xs"
            :error-messages="errors"
            v-model="name"
            label="Name"
            outlined
            required
          />
        </validation-provider>

        <validation-provider
          rules="required|email"
          v-slot="{ errors }"
          name="Email"
        >
          <v-text-field
            :dense="$vuetify.breakpoint.xs"
            :error-messages="errors"
            v-model="email"
            label="E-mail"
            outlined
            required
          />
        </validation-provider>

        <validation-provider
          name="Registro acadêmico"
          v-slot="{ errors }"
          rules="required"
        >
          <v-text-field
            :disabled="$route.params.id !== '0'"
            :dense="$vuetify.breakpoint.xs"
            label="Registro acadêmico"
            :error-messages="errors"
            type="number"
            v-model="ra"
            outlined
            required
          />
        </validation-provider>

        <validation-provider
          :rules="{ regex: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, required: {} }"
          v-slot="{ errors }"
          name="CPF"
        >
          <v-text-field
            :disabled="$route.params.id !== '0'"
            :dense="$vuetify.breakpoint.xs"
            :error-messages="errors"
            v-model="cpf"
            label="Cpf"
            outlined
            required
          />
        </validation-provider>

        <v-container class="d-flex justify-end">
          <v-btn class="mr-4" @click="$router.push('/alunos')" text>
            Cancelar
          </v-btn>
          <v-btn color="primary" @click="submit"> Salvar </v-btn>
        </v-container>
      </form>
    </validation-observer>
  </v-card>
</template>

<script lang="ts" src="./StudentsDetail.ts" />
