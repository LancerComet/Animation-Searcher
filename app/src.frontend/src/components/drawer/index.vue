<template lang="jade">
  div.drawer-ctnr
    //- Material Drawer.
    md-sidenav.md-left.md-fixed(@open="isOpen()", @close="isClosed()", ref="mdSidenav")
      md-toolbar.md-large
        div.md-toolbar-container
          h3.md-title Sidenav content

      p Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi cupiditate esse necessitatibus beatae nobis, deserunt ut est fugit, tempora deleniti, eligendi commodi doloribus. Nemo, assumenda possimus, impedit inventore perferendis iusto!
</template>

<script lang="ts" src="./index.ts"></script>
