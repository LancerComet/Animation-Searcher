<template lang="jade">
  div.drawer-ctnr.t-center
    //- Material Drawer.
    md-sidenav.md-left.md-fixed(@open="isOpen()", @close="isClosed()", ref="mdSidenav")
      //- Top Image.
      md-toolbar.md-large
        div.md-toolbar-container
          div.avatar-img.w-100.h-100.p-absolute.p-zero.bg-cover(role="img")

      //- Content.
      div.content-ctnr
        div.title.dp-flex.flex-column.flex-center-h
          p.app-name(v-text="appInfo.name")
          p.supporting-text Version: {{appInfo.version}} | {{appInfo.codeName}}

        div.ctrl-btn-ctnr.p-relative(ref="ctrlBtnCtnr")
          md-button.ctrl-btn.w-100(v-for="item in ctrlBtns", @click="item.onClick")
            i.material-icons.v-middle(v-text="item.icon")
            span.v-middle(v-text="item.label")

        div.w-100.p-fixed.version-info
          p
            i.icon-emo-devil(style="margin-right: 5px")
            span © 2015 - {{thisYear}} LancerComet.
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped>
  @import "../../style/def.styl"

  .drawer-ctnr
    // Width of drawer, also is avatar's height.
    $drawerWidth = size(304px)
    $avatarHeight = $drawerWidth

    // Title's height.
    $titleHeight = size(80px)

    // Bottom's height.
    $bottomPadding = size(50px)

    .md-toolbar-container
      width: $drawerWidth
      padding-top: $drawerWidth

      .avatar-img
        background-image: url('../../assets/images/avatar.lancercomet.jpg')

    .content-ctnr
      width: $drawerWidth
      height: s("calc(100% - %s - %s)", $avatarHeight, $bottomPadding)
      font-weight: 100
      // background-color: red

      .title
        height: $titleHeight
        // background-color: green

        p
          margin: 0

        .app-name
          font-size: size(15px)

        .supporting-text
          font-size: size(13px)

      .ctrl-btn-ctnr
        height: s("calc(100% - %s)", $titleHeight)
        // background-color: blue

        .ctrl-btn
          padding: size(10px) 0
          margin: 0

          i
            margin-right: size(5px)

      .version-info
        height: $bottomPadding
        bottom: 0
        font-size: size(13px)
</style>

<style lang="stylus">
  .drawer-ctnr
    .md-sidenav-content
      overflow: hidden !important
      background-color: #fff !important
      color: rgb(47, 54, 64) !important
</style>
