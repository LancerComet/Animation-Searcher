<template lang="jade">
  transition(name="fade")
    div.greeting-img-ctnr.full-size
      //- Background image.
      div.img.full-size.bg-cover.bg-center(role="img", :style="{'background-image': 'url(' + bgUrl + ')'}")
      div.bg-merge.full-size

      //- Title.
      div.title-ctnr.full-size.dp-flex.flex-center-v.flex-center-h.t-center.dp-flex.flex-column
        h1.title
          span Hello, I'm {{APPNAME}}
          br
          small
            span.v-middle Just have a try.
            i.icon-emo-happy.v-middle(style="margin-left: 10px")

        div.powered-by-btn-ctnr.p-absolute
          md-button.powered-by-btn
            i.icon-emo-devil(style="margin: 0 5px")
            span POWERED BY...
</template>

<style lang="stylus" scoped>
  @import "../../style/def.styl"

  .greeting-img-ctnr
    color: #fff

    .bg-merge
      opacity: .4
      background-color: #000

    .title-ctnr
      .title
        font-weight: 100
        line-height: 1.5

    .powered-by-btn-ctnr
      margin-top: size(200px)

      .powered-by-btn
        opacity: .5

  .full-size
    width: 100%
    height: 100%
    position: absolute
    top: 0
    left: 0
</style>

<script lang="ts" src="./index.ts"></script>
