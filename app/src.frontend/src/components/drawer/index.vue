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
        div.title
          p.app-name(v-text="appInfo.name")
          p.supporting-text Version: {{appInfo.version}} | {{appInfo.codeName}}

        div.ctrl-btn-ctnr
          md-button.ctrl-btn.w-100.h-100(v-for="item in ctrlBtns", @click="item.onClick")
            i.material-icons.v-middle(v-text="item.icon")
            span.v-middle(v-text="item.label")

        div.version-info
          p © 2015 - {{thisYear}} LancerComet.
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped>
  @import "../../style/def.styl"

  .drawer-ctnr
    .md-toolbar-container
      width: 100%
      padding-top: 100%

      .avatar-img
        background-image: url('../../assets/images/avatar.lancercomet.jpg')

    .content-ctnr
      font-weight: 100

      .title
        margin: size(20px) 0

        p
          margin: 0

        .app-name
          font-size: size(15px)

        .supporting-text
          font-size: size(13px)

      .ctrl-btn-ctnr
        .ctrl-btn
          padding: size(10px) 0
          margin: 0

          i
            margin-right: size(5px)

      .version-info
        font-size: size(13px)
</style>

<style lang="stylus">
  .drawer-ctnr
    .md-sidenav-content
      background-color: #fff !important
      color: rgb(47, 54, 64) !important
</style>
