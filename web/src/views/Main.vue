<template>

    <div>
        <div class="topbar bg-black py-2 px-3 d-flex ai-center">
            <img src="../assets/logo.jpg" height="30">
            <div class="px-2">
                <div class="text-white fs-sm">王者荣耀</div>
                <div class="text-grey-1 fs-xxs ">团队成就更多</div>
            </div>
            <div class=" flex-1"></div>
            <button type="button" class="btn bg-primary">立即下载</button>
        </div>
        <div class="bg-primary pt-3 pb-2">
            <div class="nav nav-inverse pb-1 jc-around">
                <div class="nav-item active">
                    <router-link class="nav-link" tag="div" to="/">首页</router-link>
                </div>
                <div class="nav-item">
                    <router-link class="nav-link" tag="div" to="/">攻略中心</router-link>
                </div>
                <div class="nav-item">
                    <router-link class="nav-link" tag="div" to="/">赛事中心</router-link>
                </div>
            </div>
        </div>
    <router-view></router-view>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss">
.topbar{
    position: sticky;
    top: 0;
    z-index: 999;
}
.chrome_adjust {
    font-size: 11px;
    -webkit-transform: scale(0.75);
    -o-transform: scale(1); //针对能识别-webkit的opera browser设置
}
</style>
