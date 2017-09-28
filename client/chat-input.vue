<template>
  <div class="wrapper">
    <input v-show="!multi"
      ref="singleInput"
      type="text"
      :placeholder="placeholder"
      :value="value"
      @input="updateValue"
      @keypress.enter="submit"
      @keydown.ctrl.enter.prevent="newLine"
      />
    <textarea v-show="multi"
      ref="multiInput"
      :placeholder="placeholder"
      :value="value"
      @input="updateValue"
      @keypress.enter.prevent="submit"
      @keydown.ctrl.enter.prevent="newLine"
      >
    </textarea>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: String,
    placeholder: String,
  },
  data() {
    return {
      multi: false,
      ctrlPressed: false,
    };
  },
  mounted() {
    if(this.value.includes('\n')) {
      this.makeMultiLine();
    }
  },
  methods: {
    updateValue(event) {
      const { value } = event.target;
      if(value.includes('\n')) {
        this.makeMultiLine();
      }
      this.$emit('input', value)
    },
    submit(event) {
      this.$emit('submit');
    },
    makeMultiLine() {
      this.multi = true;
      return new Promise(resolve => {
        Vue.nextTick(() => {
          this.$refs.multiInput.focus();
          resolve();
        });
      });
    },
    async newLine() {
      if(!this.multi) {
        await this.makeMultiLine();
      }
      const { multiInput: input } = this.$refs;
      input.value = input.value + '\n';
      input.scrollTop = input.scrollTop + input.clientHeight;
    },
  },
};
</script>
<style>
.wrapper{
  display: flex;
  align-items: stretch;
}
input, textarea{
  flex-grow: 1;
  background: transparent;
  border: none;
  padding: 8px 16px;
  color: #FFF;
}
textarea{
  resize: vertical;
  max-height: 80vh;
}
</style>
