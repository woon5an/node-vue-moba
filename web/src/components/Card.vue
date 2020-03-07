<template>
    <div class="card bg-white p-3 mt-3">
      <div class="card-header d-flex ai-center pb-3">
        <i class="iconfont" :class="`icon-${icon}`"></i>
        <div class="fs-xl px-2"><strong>{{title}}</strong></div>
        <div class="flex-1"></div>
        <i class="iconfont icon-menu1 " v-if="!plain"></i>
      </div>

      <div class="card-body pt-3">
          <slot></slot>
      </div>
    </div>
</template>

<script>
export default {
    props: {
        title: { type: String, required: true },
        icon: { type: String, required: true },
        plain: { type: Boolean},
    }
};
</script>


<style  lang="scss">
@import '../assets/scss/_variables.scss';
.card {
    .card-header {
        border-bottom: 1px solid $border-color;
    }
    border-bottom: 1px solid $border-color;
}
</style>