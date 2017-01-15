<template lang="jade">
  div.greeting-img-ctnr.w-100.h-100.p-absolute.p-zero
    div.img.bg-cover.w-100.h-100.p-absolute.p-zero(role="img", :style="{'background-image': 'url(' + bgUrl + ')'}")
    div.bg-merge.w-100.h-100.p-absolute.p-zero
</template>

<style lang="stylus" scoped>
  .greeting-img-ctnr
    .bg-merge
      opacity: .4
      background-color: #000
</style>

<script lang="ts" src="./index.ts"></script>
