<template lang="jade">
  div.search-bar-ctnr.w-100.p-absolute.m-auto(:class="currentStatus")
    div.dp-flex.flex-row.flex-center-h.m-auto
      div.drawer-menu-btn(ref="drawerMenuBtn")
      div.search-bar
        md-input-container(style="margin: 0")
          label(v-text="quote")
          md-input
      md-button.search-btn
</template>

<style lang="stylus" scoped>
  @import "../../style/def.styl"

  .search-bar-ctnr
    width: 90%
    max-width: size(800px)
    background-color: green

    &.greeting
      @media screen and (max-height: size(480px))
        top: 25%

      @media screen and (min-height: size(481px)) and (max-height: size(660px))
        top: 30%

      @media screen and (min-height: size(600px))
        top: 35%

    $btnSize = size(48px)
    .drawer-menu-btn
      width: $btnSize
      height: @width
      background-color: red

    .search-btn
      width: $btnSize
      height: @width
      min-width: @width
      min-height: @height
      margin: 0
      background-color: yellow

    .search-bar
      width: s("calc(100% - %s - %s)", $btnSize, $btnSize)
      background-color: blue
</style>

<script lang="ts" src="./index.ts"></script>
