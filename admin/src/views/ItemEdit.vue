<template>
  <div class="about">
    <h1>{{id? '编辑' : '新建'}}物品  </h1>
    <el-form label-width="128px" @submit.native.prevent="save">
        <!--<el-form-item label="上级分类">
            <el-select v-model="model.parent">
                <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
        </el-form-item>-->
        <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label="图标">
            <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :headers="getAuthHeaders()"
            :show-file-list="false"
            :on-success="afterUpload"
            >
            <img v-if="model.icon" :src="model.icon" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
        props: {
            id: {}
        },
        data(){
            return {
                model: {},
                //parents: [],
            }
        },
    methods: {
        afterUpload(res){
            this.$set(this.model, 'icon', res.url) //由于vue数据的响应式问题，model定义时没有定义子集什么的，普通赋值可能赋不上，所以用vue提供的显示赋值方法
            //this.model.icon = res.url
        },

        async save(){
            let res
            if(this.id) {
                res = await this.$http.put(`rest/items/${this.id}`, this.model)
            } else{
                res = await this.$http.post('rest/items/', this.model)
            }
            this.$router.push('/items/list')
            this.$message({
                type: 'success',
                message: '保存成功'
            })
        },

        async fetch(){
            const res = await this.$http.get(`rest/items/${this.id}`)
            this.model = res.data 
        }
    },

    created(){
        this.id && this.fetch()
    }

}
</script>
