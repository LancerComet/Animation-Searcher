<template lang="jade">
  transition(name="move-out-top")
    div.splash-screen-ctnr.w-100.h-100.dp-flex.flex-column.flex-center-v.flex-center-h.p-fixed.p-zero(v-show="isShown")
      div.avatar-img.circle.over-hidden.a-scale-in-ease(:class="{ active: showAvatar }")
        img(ref="avatarImg", src="../../assets/images/avatar.lancercomet.jpg")
      p.text.a-move-in-top(:class="{ active: showText }") # Carry Your World #
      md-progress.progress.a-move-in-top(md-indeterminate, :class="{ active: showProgress }")
</template>

<style lang="stylus" scoped>
  @import "../../style/def.styl"

  .splash-screen-ctnr
    background-color: #fff
    color: #698dda
    animation-duration: .9s !important

    $avatarSize = size(300px)

    .avatar-img
      width: $avatarSize
      height: @width
      background-color: #698dda

    .text
      animation-delay: .4s

    .progress
      width: $avatarSize
      animation-delay: .8s

    .avatar-img
    .text
    .progress
      visibility: hidden

      &.active
        visibility: visible

    @media screen and (max-width: size(320px))
      $avatarSize = size(250px)

      .avatar-img
        width: $avatarSize
        height: @width

      .progress
        width: $avatarSize

</style>

<script lang="ts" src="./index.ts"></script>
