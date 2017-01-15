<template lang="jade">
  div.search-bar-ctnr.w-100.p-absolute.m-auto.ts-dot-4(:class="searchBarStatus")
    form(name="search-form" @submit.prevent="search")
      div.dp-flex.flex-row.flex-center-h.m-auto
        //- Drawer Menu Button.
        md-button.drawer-menu-btn(@click="toggleDrawerMenuStatus")
          div.menu-icon.m-auto(ref="drawerMenuBtn")

        //- Search bar.
        div.search-bar(@click="switchToSearchingMode")
          md-input-container.search-input-ctnr.ts-dot-8
            label.w-100.text-hidden(v-text="quote")
            md-input.search-input(v-model="keyword")

        //- Search Button.
        md-button.search-btn.v-bottom
          i.material-icons.v-middle search
</template>

<style lang="stylus" scoped>
  @import "../../style/def.styl"

  .search-bar-ctnr
    width: 90%
    max-width: size(700px)
    // background-color: green

    &.greeting
      @media screen and (max-height: size(480px))
        top: 25%

      @media screen and (min-height: size(481px)) and (max-height: size(660px))
        top: 30%

      @media screen and (min-height: size(600px))
        top: 35%

    &.searching
      @media screen and (max-height: size(480px))
        top: 5%

      @media screen and (min-height: size(481px)) and (max-height: size(660px))
        top: 6%

      @media screen and (min-height: size(600px))
        top: 8%

    $searchBarHeight = size(48px)

    .drawer-menu-btn
      $btnSize = size(35px)
      width: $btnSize
      height: @width
      padding: 0
      margin-top: $searchBarHeight - $btnSize
      // background-color: red

      .menu-icon
        $iconSize = size(25px)
        width: $iconSize
        height: @width
        background-image: url('./assets/icon.drawer-menu.png')

    .search-btn
      $size = size(35px)
      width: $size
      height: @width
      min-width: @width
      min-height: @height
      padding: 0
      margin: $searchBarHeight - $size 0 0 0
      // background-color: yellow

    .search-bar
      width: s("calc(100% - %s - %s)", $searchBarHeight, $searchBarHeight)
      // background-color: blue

      .search-input-ctnr
        $color = rgba(255, 255, 255, .8)
        margin: 0
        color: $color

        label
        input
          font-weight: 100
          color: inherit

        label
          font-size: size(14px)

        &.md-input-focused
          label
            font-size: size(12px)

          input
            color: $color !important
            -webkit-text-fill-color: #fff !important

        &:after
          background-color: $color
</style>

<script lang="ts" src="./index.ts"></script>
