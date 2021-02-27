<template>
  <div class="auth">
    <div class="tabs">
      <h1 @click="isShowLoginForm(true)" :class="isLoginForm ? 'header-text' : ''">Login</h1>
      <h1 @click="isShowLoginForm(false)" :class="isLoginForm ? '' : 'header-text'">Signup</h1>
    </div>

    <form @submit.prevent="isLoginForm ? login() : signup()">
      <div>
        <input
          placeholder="Username"
          v-model="form.username"
          @input="onInput(
            'username',
            /(^[a-zA-Z0-9 @/./+/-/_]{1,150})+$/g,
            'No more than 150 characters, include only letters, numbers and symbols @/./+/-/_.',
          )"
        />

        <p v-if="form.errors.username" class="error">{{ form.errors.username }}</p>

        <ul v-if="errorsData.usernameArr">
          <li v-for="(err, i) in errorsData.usernameArr" :key="i" class="error">
            {{ err }}
          </li>
        </ul>
      </div>

      <div v-if="!isLoginForm">
        <input placeholder="Email" v-model="form.email" />

        <ul v-if="errorsData.emailArr">
          <li v-for="(err, i) in errorsData.emailArr" :key="i" class="error">
            {{ err }}
          </li>
        </ul>
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          v-model="form.password"
          @input="onInput(
            'password',
            /^.{8,}$/,
            'Password minimum length is 8',
          )"
        />

        <p v-if="form.errors.password" class="error">{{ form.errors.password }}</p>

        <ul v-if="errorsData.passwordArr">
          <li v-for="(err, i) in errorsData.passwordArr" :key="i" class="error">
            {{ err }}
          </li>
        </ul>
      </div>

      <div>
        <button :disabled="!form.valid" :class="!form.valid ? 'disabled-btn' : 'enabled-btn'">
          {{ isLoginForm ? 'Log in' : 'Sign up' }}
        </button>

        <p v-if="errorsData.notFind" class="error">{{ errorsData.notFind }}</p>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue';
import { useStore } from 'vuex';
import router from '../router';

const initialForm = {
  username: '',
  email: '',
  password: '',
  errors: {},
  valid: false,
};

export default {
  setup() {
    const { commit, dispatch } = useStore();
    const form = ref({ ...initialForm });
    const errorsData = ref({});
    const isLoginForm = ref(true);

    const signup = () => {
      dispatch('signup', form.value)
        .then(() => isShowLoginForm(true))
        .catch(({ response }) => {
          if (response.data.username) {
            errorsData.value.usernameArr = response.data.username;
          } else {
            delete errorsData.value.usernameArr;
          }

          if (response.data.password) {
            errorsData.value.passwordArr = response.data.password;
          } else {
            delete errorsData.value.passwordArr;
          }

          if (response.data.email) {
            errorsData.value.emailArr = response.data.email;
          } else {
            delete errorsData.value.emailArr;
          }
        });
    };

    const login = () => {
      dispatch('login', form.value)
        .then(({ data }) => {
          localStorage.setItem('token', data.token);
          commit('setIsAuth', true);
          router.push('/');
        })
        .catch(({ response }) => {
          if (response) {
            errorsData.value.notFind = 'User not find';
          } else {
            delete errorsData.value.notFind;
          }
        });
    };

    const onInput = (name, regex, errorText) => {
      if (!form.value[name]) {
        form.value.errors[name] = 'Required field';
      } else if (!regex.test(form.value[name])) {
        form.value.errors[name] = errorText;
      } else if (form.value.errors[name]) {
        delete form.value.errors[name];
      }
    };

    const isShowLoginForm = (bool) => {
      isLoginForm.value = bool;
      form.value = { ...initialForm };
      form.value.errors = {};
      errorsData.value = {};
    };

    watchEffect(() => {
      const { errors, username, password } = form.value;
      if (Object.values(errors).every((e) => e === '') && username && password) {
        form.value.valid = true;
      } else {
        form.value.valid = false;
      }
    });

    return {
      isLoginForm,
      form,
      signup,
      login,
      errorsData,
      isShowLoginForm,
      onInput,
    };
  },
};
</script>

<style lang="scss">
@import '../assets/scss/components/auth';
</style>
