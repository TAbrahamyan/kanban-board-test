<template>
  <div class="home">
    <Header />

    <div class="cards">
      <Cards :headerText="'ON HOLD'" :cardItems="cards0" :headerColor="'#ED854A'" :row="'0'" />
      <Cards :headerText="'IN PROGRESS'" :cardItems="cards1" :headerColor="'#4191BA'" :row="'1'" />
      <Cards :headerText="'NEEDS REVIEW'" :cardItems="cards2" :headerColor="'#F0CC56'" :row="'2'" />
      <Cards :headerText="'APPROVED'" :cardItems="cards3" :headerColor="'#53B269'" :row="'3'" />
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import Header from '@/components/Header.vue';
import Cards from '@/components/Cards.vue';

export default {
  components: { Header, Cards },
  setup() {
    const { getters, commit, dispatch } = useStore();

    onMounted(() => {
      dispatch('getAll')
        .then(({ data }) => commit('setCards', data));
    });

    return {
      cards0: getters.cards0,
      cards1: getters.cards1,
      cards2: getters.cards2,
      cards3: getters.cards3,
    };
  },
};
</script>

<style lang="scss">
@import '../assets/scss/components/home';
</style>
