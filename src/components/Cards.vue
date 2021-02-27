<template>
  <div class="card">
    <h1 :style="{ background: headerColor }">
      {{ headerText }} ({{ cards.length }})
    </h1>

    <div class="card-items">
      <draggable v-model="cards" v-bind="dragOptions" @change="update">
        <template #item="{element}">
          <div class="item">
            <span @click="remove(element.id)">&times;</span>
            <p><b>id:</b> {{ element.id }}</p>
            <p>{{ element.text }}</p>
          </div>
        </template>
      </draggable>

      <div class="add-card-textfield" v-if="isShowTextfield">
        <textarea rows="6" v-model="textField" placeholder="Ввести заголовок для этой карточки" />

        <div>
          <button @click="create" :disabled="!textField.length">
            Добавить карточку
          </button>

          <div class="close" @click="isShowTextfield = false">&times;</div>
        </div>
      </div>

      <div class="add-card" @click="isShowTextfield = true" v-if="!isShowTextfield">
        <label>&#x2B;</label> Добавить карточку
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import draggable from 'vuedraggable';

export default {
  components: { draggable },
  props: {
    cardItems: { type: Array, required: true },
    headerText: { type: String, required: true },
    headerColor: { type: String, required: true },
    row: { type: String, required: true },
  },
  setup(props) {
    const { dispatch } = useStore();
    const cards = ref(props.cardItems);
    const row = ref(props.row);
    const isShowTextfield = ref(false);
    const textField = ref('');
    const dragOptions = {
      animation: 200,
      group: 'description',
      disabled: false,
      ghostClass: 'ghost',
    };

    const create = () => {
      if (textField.value) {
        dispatch('create', { text: textField.value, row: row.value })
          .then(({ data }) => cards.value.push(data))
          .catch(({ response }) => console.log('err:', response));

        isShowTextfield.value = false;
        textField.value = '';
      }
    };

    const remove = (id) => {
      dispatch('remove', id);
      cards.value = cards.value.filter((item) => item.id !== id);
    };

    const update = (event) => {
      const item = (event.moved || event.added);
      if (item) {
        let newSeqNumber = 0;

        if (item.newIndex !== 0) {
          const prevCard = cards.value[item.newIndex - 1];
          newSeqNumber = prevCard.seq_num + 1;
        }

        dispatch('update', { id: item.element.id, seq_num: newSeqNumber, row: row.value })
          .then(({ data }) => {
            item.element.row = data.row;
            item.element.seq_num = data.seq_num;
          })
          .catch(({ response }) => console.log('err:', response));
      }
    };

    return {
      cards, isShowTextfield, textField, dragOptions, create, remove, update,
    };
  },
};
</script>
