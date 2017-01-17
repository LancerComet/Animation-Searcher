<template lang="jade">
  div.main-ctnr
    md-layout.layout-ctnr(md-gutter="24")
      md-layout.sidebar-ctnr(md-flex="20") sidebar
      md-layout.result-list-ctnr(md-flex="80") resultList
</template>

<style lang="stylus" scoped>
  @import "../../style/def.styl"

  .layout-ctnr
    max-width: size(1200px)
    width: 90%
    margin: 0 auto !important
    background-color: blue

    .sidebar-ctnr
      background-color: red

    .result-list-ctnr
      background-color: orange
</style>

<script lang="ts" src="./index.ts"></script>
