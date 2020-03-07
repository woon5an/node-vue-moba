<template>
    <m-card :icon="icon" :title="title">
      <div class="nav jc-between">
        <div class="nav-item" :class="{ active: active === i }"
        v-for="(category, i) in categories" :key="i"
        @click="$refs.list.swiper.slideTo(i)">
          <div class="nav-link pr-2">{{category.name}}</div>
        </div>
      </div>
      <div class="pt-3">
        <swiper ref="list" :options="{autoHeight: true}"
        @slide-change="() => active = $refs.list.swiper.realIndex">                                                        <!--把Home主页的数据props传到子组件ListCard来，v-for循环的时候根据插槽的数据绑定把数据再传送到home外层进行循环展示-->                
          <swiper-slide v-for="(category, i) in categories" :key="i">    
              <slot name="items" :category="category"></slot>                                   
          </swiper-slide>
        </swiper>
      </div>
    </m-card>
</template>

<script>
export default {
    props: {
        icon: { type: String, required: true },
        title: { type: String, required: true },
        categories: { type: Array, required: true }
    },
    data(){
        return{
            active: 0
        }
    }
};
</script>

<style>

</style>