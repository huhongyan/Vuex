<style lang="less">
.m-page-group{
    text-align: right;
    font-size: 14px;
    margin-bottom: 10px;
    .page-btns{
        display: inline-block;
        vertical-align: middle;
        padding-left: 0;
        list-style-type: none;
        margin-bottom: 0;
        > li{
            float: left;
            > button{
                display: block;
                padding: 0;
                text-align: center;
                font-size: 12px;
                height: 22px;
                width: 22px;
                background-image: none;
                border: 1px solid #e5e5e5;
                background-color: #fff;
                margin-right: 6px;
                overflow: hidden;
            }
            .btn-prev, .btn-next{
                line-height: 22px;
                &:before{
                    content: '';
                    display: inline-block;
                    border-color: #999;
                    border-style: solid;
                    border-top-width: 5px;
                    border-bottom-width: 5px;
                    border-top-color: transparent;
                    border-bottom-color: transparent;
                }
                &.disable:before{
                    border-left-color: #dddddd;
                    border-right-color: #dddddd;
                }
            }
            .btn-prev:before{
                border-right-width: 5px;
                border-left-width: 0;
            }
            .btn-next:before{
                border-right-width: 0;
                border-left-width: 5px;
            }
            .btn-page{
                line-height: 20px;
                &:hover, &.active{
                    border-color: #3C98FE;
                    background-color: #3C98FE;
                    color: #fff;
                }
                &.active{cursor: default}
            }
        }
    }
    .page-toolbar{
        display: inline-block;
        vertical-align: middle;
        .page-sel{
            height: 22px;
            width: 46px;
            border: 1px solid #e5e5e5;
        }
    }
}
</style>
<template>
    <div class="m-page-group">
        <ul class="page-btns clearfix">
            <li class="">
                <button :class="pageNumber == 1 ? 'disable btn-prev': 'btn-prev'"></button>
            </li>
            <li v-for="btn in buttons">
                <button v-if="btn.isButton" @click="forward(btn.active, btn.number)"
                        :class="btn.active ? 'active btn-page' : 'btn-page'">{{btn.number}}</button>
                <span v-else>{{btn.txt}}</span>
            </li>
            <li>
                <button :class="pageNumber == pageCount ? 'disable btn-next' : 'btn-next'"></button>
            </li>
        </ul>
        <div class="page-toolbar">
            <span>第 {{pageNumber || 1}} 页</span>
            <select v-model="pageSize" class="page-sel">
                <option v-for="item in pageList" value="{{item}}">{{item}}</option>
            </select>
            <span>条/页，共 {{params.total || 0}} 条</span>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            'params': {
                type: Object,
                default: function () {
                    return {}
                    // pageNumber: 当前页数
                    // pageList: 可选择的每页记录数
                    // pageSize: 每页展示的数据量
                    // pageCount: 总页数
                    // total: 数据总数
                    // callback: 数据变化
                }
            }
        },
        computed: {
            pageList: function(){
                return this.params.pageList || [10, 20, 50]
            },
            pageNumber: function(){
                return this.params.pageNumber || 1
            },
            pageSize: {
                get: function() {
                    let vm = this,
                        pageList = vm.pageList,
                        pageSize = vm.params.pageSize;

                    return pageList.find((n)=>n == pageSize) || pageList[0]
                },
                set: function(newValue){
                    this._reload({
                        pageSize: newValue,
                        pageNumber: 1
                    })
                }
            },
            pageCount: function(){
                let params = this.params;
                return params.pageCount || Math.ceil(params.total / this.pageSize)
            },
            buttons: function(){
                let btns = [],
                    vm = this,
                    curNum = vm.pageNumber,
                    count = vm.pageCount;

                if(count <= 9){
                    for(let i = 1; i <= count; i++){
                        btns.push({
                            isButton: true,
                            number: i,
                            active: i == curNum
                        })
                    }
                }else{
                    if(curNum < 4){
                        for(let i = 1; i <= 4; i++){
                            btns.push({
                                isButton: true,
                                number: i,
                                active: i == curNum
                            })
                        }
                    }else {
                        btns.push({
                            isButton: true,
                            number: 1
                        })
                    }

                    btns.push({
                        isButton: false,
                        txt: '...'
                    });

                    if(curNum > count - 3){
                        for(let i = 3; i > 0; i--){
                            let temp = count - i;
                            btns.push({
                                isButton: true,
                                number: temp,
                                active: temp == curNum
                            })
                        }
                    }else if(curNum > 3){
                        for(let i = curNum - 1; i < curNum + 2; i++){
                            btns.push({
                                isButton: true,
                                number: i,
                                active: i == curNum
                            })
                        }

                        btns.push({
                            isButton: false,
                            txt: '...'
                        });
                    }

                    btns.push({
                        isButton: true,
                        number: count
                    })
                }

                return btns;
            }
        },
        methods: {
            forward: function(active, pageNumber){
                if(active) return false;
                let vm = this;
                vm._reload({
                    pageSize: vm.pageSize,
                    pageNumber: pageNumber
                })
            },
            _reload: function(){
                let fn = this.params.callback;
                fn && fn.apply(null, arguments);
            }
        }
    }
</script>