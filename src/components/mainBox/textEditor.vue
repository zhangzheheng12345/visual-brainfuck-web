<template>
  <div id="wrapText">
    <span
      id="IOlabel"
      @click="toggleIOlabel"
      :title="IorO ? 'toggle to ouput' : 'toggle to input'"
      >{{ IorO ? "IN" : "OUT" }}</span
    >
    <input id="in" title="input" v-model="_in" v-show="IorO" />
    <input id="out" title="out" v-model="out" v-show="!IorO" readonly />
    <button id="clearCode" @click="$emit('clear')" title="clear the codes">
      <img src="./svgs/trash.svg" type="image/svg+xml" />
    </button>
    <textarea id="text" v-model="codes" :readonly="textareaReadonly"></textarea>
  </div>
</template>

<script>
export default {
  props: ["textareaReadonly", "inIn", "inOut", "inCodes", "inIorO"],
  emits: [
    "clear",
    "update:inIn",
    "update:inOut",
    "update:inCodes",
    "update:inIorO",
  ],
  computed: {
    _in: {
      // in is a key word in Vue
      get() {
        return this.inIn;
      },
      set(value) {
        this.$emit("update:inIn", value);
      },
    },
    out: {
      get() {
        return this.inOut;
      },
      set(value) {
        this.$emit("update:inOut", value);
      },
    },
    codes: {
      get() {
        return this.inCodes;
      },
      set(value) {
        this.$emit("update:inCodes", value);
      },
    },
    IorO: {
      get() {
        return this.inIorO;
      },
      set(value) {
        this.$emit("update:inIorO", value);
      },
    },
  },
  methods: {
    toggleIOlabel() {
      this.IorO = !this.IorO;
    },
  },
};
</script>

<style scoped>
#IOlabel {
  /* width: 25px; */
  color: #fff;
  background-color: var(--dark-grey);
  float: left;
  border-radius: 5px;
  margin: 5px;
  padding: 5px;
  height: 25px;
  font-family: "Ubuntu";
  font-size: 21px;
  cursor: default;
}

#IOlabel:hover {
  transform: scale(1.1, 1.1);
}

#wrapText {
  margin-left: 1px;
  padding: 2px;
  border-radius: 5px;
  background-color: var(--very-dark-grey);
  width: 100%;
}

#clearCode {
  float: right;
  margin: 5px;
  padding: 4px;
  background-color: var(--extremely-dark-grey);
  border-width: 0px;
  border-radius: 10px;
  width: 40px;
  height: 35px;
  color: #fff;
}

#clearCode:hover {
  transform: scale(1.1, 1.1);
}

#text {
  height: 450px;
  width: 100%;
  margin: 5px;
  border-color: var(--very-dark-grey);
  border-radius: 0px;
  background-color: var(--very-dark-grey);
  color: #fff;
  font-size: 16px;
  font-family: "IBM Plex Mono", Courier, Menlo, Consolas, monospace;
  box-sizing: border-box;
  resize: none;
  overflow: auto;
  scroll-behavior: smooth;
}

#text:focus,
#in:focus,
#out:focus {
  outline: 0px;
}

#in,
#out {
  float: left;
  height: 25px;
  border-radius: 5px;
  border-width: 0px;
  padding: 5px;
  padding-left: 10px;
  background-color: #fff;
  margin: 5px;
  width: 75%;
  color: var(--very-dark-grey);
  font-size: 18px;
  font-family: "IBM Plex Mono", Courier, Menlo, Consolas, monospace;
}
</style>
