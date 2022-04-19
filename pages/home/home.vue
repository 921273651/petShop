<template>
  <view>
    <!-- 轮播图区域   usw自动生成代码块-->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
      <!-- 循环遍历 -->
      <swiper-item v-for="(item,i) in swiperList" :key = "i">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
          <image :src="item.image_src"></image>
          </navigator>
      </swiper-item>
    </swiper>
    <!-- 分类导航区域 -->
    <view class="nav-list">
      <!-- 添加click事件，点击item项 -->
      <view class="nav-item" v-for="(item,i) in navList" :key="i" @click="navClickHandler(item)">
        <image :src="item.image_src" class ="nav-img" ></image>
      </view>
    </view>
    <!-- 楼层区域 -->
    <!-- 楼层容器 -->
    <view class="floor-list">
      <!-- 每个楼层item项 -->
      
      <view class ="floor-item" v-for="(item,i) in floorList" :key="i">
        <!-- 楼层的标题 -->
        <!-- 数组中封装好的图片调用 -->
        <image :src="item.floor_title.image_src" class="floor_title"></image>
        <view class="floor-img-box">
          <!-- 左侧大图 -->
          <navigator class="left-img-box" :url="item.product_list[0].url">
            <!-- : 表示动态绑定    mode图片自适应 -->
            <img :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width +'rpx'} "mode="widthFix"></image>
          </navigator>
          <!-- 右侧小图 -->
          <view class="right-img-box" >
            <!-- v-if="i2 !==0"只显示索引为1-3的图片 -->
            <navigator class="right-img-item" v-for="(item2,i2) in item.product_list" :key="i2" v-if="i2 !==0" :url="item2.url">
              <image :src="item2.image_src" :style="{width:item2.image_width + 'rpx'}"mode="widthFix" ></image>
            </navigator>
            
          </view>
        </view>
      </view>
    </view>
  </view>
  
</template>

<script>
  export default {
    data() {
      
      return {
        //轮播图数据列表
        swiperList:[],
        //分类导航的数据列表
        navList:[],
        //楼层的数据列表
        floorList:[],
      };
    },
    //调用方法，获取轮播图的数据
    onLoad() {
      this.getSwiperList()
       //调用方法，获取导航栏的数据
      this.getNavList()
      //调用方法，获取楼层数据
      this.getFloorList()
    },
    methods:{
     async getSwiperList(){
     const {data:res}= await   uni.$http.get('/api/public/v1/home/swiperdata')
     //请求失败
     if(res.meta.status !==200)return uni.$showMsg()
     this.swiperList = res.message
     uni.$showMsg('数据请求成功')
      },
    async getNavList(){
    const {data:res}=await    uni.$http.get('/api/public/v1/home/catitems')
     if(res.meta.status !==200)return uni.$showMsg()
     this.navList = res.message
      },
    async  getFloorList(){
    const {data:res}=await  uni.$http.get('/api/public/v1/home/floordata')
   if(res.meta.status !==200)return uni.$showMsg()
   //对数据进行处理
   //通过双层forEach循环，处理Url地址
   res.message.forEach(floor =>{
     floor.product_list.forEach(prod =>{
       //url指向要跳转的地址，以及携带的参数
       prod.url ='/subpkg/goods_list/goods_list?' +prod.navigator_url.split('?')[1]
     })
   })
   this.floorList = res.message
      },
      
      
      
      navClickHandler(item) {
        if(item.name==='分类'){
          uni.switchTab({
            url:'/pages/cate/cate'
          })
        }
      }
    }
  }
</script>

<style lang="scss">
swiper {
  height: 330rpx;
  .swiper-item,
  image{
    width: 100%;
    height: 100%;
    
  }
  
}
.nav-list,{
  display:flex;
  justify-content:space-around;
  margin:15px 0;
}
.nav-img{
  
  width: 128rpx;
  height: 140rpx;
}
.floor_title{
  width:100%;
  height:60rpx;
}
.right-img-box{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.floor-img-box{
  display: flex;
  padding-left:10rpx ;
}
</style>
