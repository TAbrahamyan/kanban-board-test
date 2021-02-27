<template>
  <router-view />
</template>

<style lang="scss">
* { box-sizing: border-box }

body {
  font-family: Arial, sans-serif;
  background: #35383f;
  margin: 0;
  padding: 0;
}

::-webkit-scrollbar {
  width: 8px;

  &-thumb {
    background: #53B269;
    border-radius: 6px;

    &:hover {
      background: #00c6ff;
    }
  }
}
</style>
