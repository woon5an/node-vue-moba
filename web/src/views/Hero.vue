<template>
  <div class="page-hero" v-if="model">
    <div class="topbar bg-black py-2 px-3 d-flex ai-center text-white">
        <img src="../assets/logo.jpg" height="30">
        <div class="px-2">
          <span class="text-white fs-sm">王者荣耀</span>        
          <span class="text-while1 fs-sm ml-3">攻略站</span>
        </div>
        <div class=" flex-1"></div>
        <router-link to="/" tag="div">更多英雄 &gt;</router-link>
    </div>
    <div class="top" :style="{ 'background-image': `url(${model.banner})` }">
      <div class="info text-white p-3">
        <div class="d-flex mt-6 fs-sm">{{model.title}}</div>
        <h2 class="my-2 d-flex mt-2">{{model.name}}</h2>
        <div class="d-flex mt-2 fs-sm">{{model.categories.map(v => v.name).join('/')}}</div>
        <div class="d-flex mt-2">
          <div class="scores d-flex ai-center" v-if="model.scores">
            <span>难度</span>
            <span class="badge bg-primary">{{model.scores.difficult}}</span>
            <span>技能</span>
            <span class="badge bg-blue-1">{{model.scores.skills}}</span>
            <span>攻击</span>
            <span class="badge bg-primary">{{model.scores.attack}}</span>
            <span>生存</span>
            <span class="badge bg-dark-1">{{model.scores.survive}}</span>         
          </div>
          <div class="flex-1 ai-center"></div>
          <router-link to='/' tag="span" class="text-grey fs-sm">
            皮肤: 6 &gt;
          </router-link>
        </div>
      </div>
    </div>
  <!--end of top -->
  <div>
    <div class="px-3 bg-white">
      <div class="nav d-flex jc-around pt-3 pb-2 border-bottom">
        <div class="nav-item  active">
          <div class="nav-link">英雄初识</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">进阶攻略</div>
        </div>
      </div>
    </div>
    <swiper>
      <swiper-slide>
        <div>
          <div class="p-3 bg-white border-bottom">
            <div class="d-flex">
              <router-link tag="button" to="/" class="btn btn-lg flex-1">
                <i class="iconfont icon-card-hero"></i>
                英雄介绍视频
              </router-link>
              <router-link tag="button" to="/" class="btn btn-lg flex-1 ml-2">
                <i class="iconfont icon-news"></i>
                一图识别英雄
              </router-link>
            </div>

            <!-- skills -->
            <div class="skills bg-white mt-4">
              <div class="d-flex jc-around flex-wrap">
                <img :src="item.icon" 
                @click="currentSkillIndex = i"
                :class="{active: currentSkillIndex === i}"
                v-for="(item, i) in model.skills" 
                :key="item.name"
                width="60"
                height="60" 
                class="mx-3 mb-2 icon">
              </div>
              <div>
                <div class="d-flex pt-4 pb-2">
                  <h3 class="m-0">{{currentSkill.name}}</h3>
                  <span class="text-grey-1 ml-4">(冷却值:{{currentSkill.delay}} 消耗:{{currentSkill.cost}} )</span>
                </div>
                <p class="text-left">{{currentSkill.description}}</p>
                <div class="border-bottom"></div>
                <p class="text-grey-1 text-left">小提示:{{currentSkill.tips}}</p>
              </div>
            </div>
          </div>
          <m-card plain icon="menu" title="出装推荐" class="hero-items">
            <div class="fs-xl text-left pb-3">顺风出装</div>
            <div class="d-flex jc-around text-center">
              <div v-for="item in model.items1" :key="item.name">
                <img :src="item.icon" class="icon mb-1">
                <div class="fs-xs">{{item.name}}</div>
              </div>
            </div>
            <div class="border-bottom mt-4 mb-2"></div>
            <div class="fs-xl text-left pb-3">逆风出装</div>
            <div class="d-flex jc-around text-center">
              <div v-for="item in model.items2" :key="item.name">
                <img :src="item.icon" class="icon mb-1">
                <div class="fs-xs">{{item.name}}</div>
              </div>
            </div>            
          </m-card>
          <m-card plain icon="menu" title="使用技巧">
            <p class="m-0 text-left">{{model.usageTips}}</p>
          </m-card>
          <m-card plain icon="menu" title="对抗技巧">
            <p class="m-0 text-left">{{model.battleTips}}</p>
          </m-card>
          <m-card plain icon="menu" title="团战思路">
            <p class="m-0 text-left">{{model.teamTips}}</p>
          </m-card>
          <m-card plain icon="menu" title="英雄关系">
            <div class="fs-xl text-left">最佳搭档</div>
            <div v-for="item in model.partners" :key="item.name"
            class="d-flex pt-4">
              <img :src="item.hero.avatar" alt="" height="50">
              <p class="flex-1 mx-3 m-0 text-left">
                {{item.description}}
              </p>
            </div>
            <div class="border-bottom mt-3"></div>
          </m-card>
        </div>
      </swiper-slide>
      <swiper-slide></swiper-slide>
    </swiper>
  </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true}
  },
  data(){
    return {
      model: null,
      currentSkillIndex: 0  //记录当前技能的下标
    }
  },
  computed:{
    currentSkill(){         //写一个计算属性，当技能下标变化时，获取相应的技能
      return this.model.skills[this.currentSkillIndex]
    }
  },
  methods: {
    async fetch(){
      const res = await this.$http.get(`heroes/${this.id}`)
      this.model = res.data
    }
  },
  created(){
    this.fetch()
  }
};
</script>

<style lang="scss">
@import '../assets/scss/_variables.scss';
.page-hero {
  .top {
    height: 50vw;
    background: #fff no-repeat top center;
    background-size: 100% auto;
  }
  .info {
    background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1));
    .scores {
      .badge {
        margin: 0 0.25rem;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        line-height: 0.9rem;
        text-align: center;
        border-radius: 50%;
        font-size: 0.6rem;
        border: 1px solid rgba(255,255,255,0.2)
      }
    }
  }
  .skills {
    img.icon {
      border: 3px solid map-get($colors, 'white');
      &.active {
        border-color: map-get($colors, 'primary')
      }
      border-radius: 50%;
    }
  }
  .hero-items {
    img.icon {
      width:50px;
      height:50px;
      border-radius: 50%
    }
  }
}

</style>