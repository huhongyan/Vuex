<style lang="less">
.m-page-group{
    text-align: right;
    font-size: 14px;
    .page-btns{
        display: inline-block;
        vertical-align: middle;
        padding-left: 0;
        list-style-type: none;
        margin-bottom: 10px;
        > li{
            float: left;
            padding-right: 6px;
            > button{
                display: block;
                padding: 0 6px;
                text-align: center;
                font-size: 12px;
                height: 22px;
                background-image: none;
                border: 1px solid #e5e5e5;
                background-color: #fff;
                transition: background-color, border-color ease-in .2s;
            }
            .btn-prev, .btn-next{
                width: 22px;
                line-height: 22px;
                outline: none !important;
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
                &.disable{
                    cursor: default;
                    &:before{
                         border-left-color: #dddddd;
                         border-right-color: #dddddd;
                    }
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
        margin-bottom: 10px;
        .page-form{
            height: 22px;
            width: 46px;
            border: 1px solid #e5e5e5;
        }
        .form-txt{
            padding: 0 6px;
        }
        .mr10{
            margin-right: 10px;
        }
    }
}
</style>
<template>
    <div class="m-page-group">
        <ul class="page-btns clearfix">
            <li class="">
                <button :class="pageNumber == 1 ? 'disable btn-prev': 'btn-prev'"
                        @click="forward(pageNumber == 1, +pageNumber - 1)"></button>
            </li>
            <li v-for="btn in buttons">
                <button v-if="btn.isButton" @click="forward(btn.active, btn.number)"
                        :class="btn.active ? 'active btn-page' : 'btn-page'">{{btn.number}}</button>
                <span v-else>...</span>
            </li>
            <li>
                <button :class="pageNumber == pageCount ? 'disable btn-next' : 'btn-next'"
                        @click="forward(pageNumber == pageCount, +pageNumber + 1)"></button>
            </li>
        </ul>
        <div class="page-toolbar">
            <span class="mr10">第&nbsp;{{pageNumber || 1}}&nbsp;页</span>
            <span>跳到第</span>
            <input type="text" placeholder="n" class="page-form form-txt"
                   @keydown.enter="forward(false, $event.target.value, $event.target)"/>
            <span class="mr10">页</span>
            <select v-model="pageSize" class="page-form">
                <option v-for="item in pageList" value="{{item}}">{{item}}</option>
            </select>
            <span>条/页，共&nbsp;{{params.total || 0}}&nbsp;条</span>
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
                return Number(this.params.pageNumber) || 1
            },
            pageSize: {
                get: function() {
                    let vm = this,
                        pageList = vm.pageList,
                        pageSize = vm.params.pageSize;

                    return Number(pageList.find((n)=>n == pageSize) || pageList[0])
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
                return params.pageCount || Math.ceil(Number(params.total) / this.pageSize)
            },
            buttons: function(){
                let btns = [],
                    vm = this,
                    curNum = vm.pageNumber,
                    count = vm.pageCount;

                if(count <= 9){
                    vm._loopFill(btns, 1, count, curNum);
                }else{
                    if(curNum < 4){
                        vm._loopFill(btns, 1, 4, curNum);
                    }else {
                        vm._fillBtn(btns, true, 1);
                    }

                    vm._fillBtn(btns, false);

                    if(curNum > count - 3){
                        for(let i = 3; i > 0; i--){
                            let temp = count - i;
                            vm._fillBtn(btns, true, temp, curNum);
                        }
                    }else if(curNum > 3){
                        vm._loopFill(btns, curNum - 1, curNum + 1, curNum);
                        vm._fillBtn(btns, false);
                    }

                    vm._fillBtn(btns, true, count, curNum);
                }

                return btns;
            }
        },
        methods: {
            forward: function(active, pageNumber, target){
                if(active || !Number(pageNumber)) return false;
                let vm = this;
                vm._reload({
                    pageSize: vm.pageSize,
                    pageNumber: Number(pageNumber)
                });

                target && (target.value = '')
            },
            _reload: function(){
                let fn = this.params.callback;
                fn && fn.apply(this.$parent, arguments);
            },
            _fillBtn: function(btns, isBut, number, curNum){
                btns.push({
                    isButton: isBut,
                    number: number,
                    active: number == curNum
                })
            },
            _loopFill: function(btns, start, len, curNum){
                for(let i = start; i <= len; i++){
                    this._fillBtn(btns, true, i, curNum);
                }
            }

        }
    }
</script>