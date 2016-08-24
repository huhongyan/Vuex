<style lang="less">
    .m-sort {
        cursor: pointer;
        .m-sort-icon {
            display: inline-block;
            vertical-align: middle;
            margin-left: 5px;
            &:before, &:after {
                content: '';
                display: block;
                border-color: #989898;
                border-style: solid;
                border-right-color: transparent;
                border-left-color: transparent;
                border-left-width: 5px;
                border-right-width: 5px;
            }
            &:after {
                 border-top-width: 5px;
                 border-bottom-width: 0;
                 margin-top: 5px;
            }
            &:before {
                 border-bottom-width: 5px;
                 border-top-width: 0;
            }
        }
        &.desc .m-sort-icon:after{
            border-top-color: #1ec64d;
        }
        &.asc .m-sort-icon:before{
            border-bottom-color: #1ec64d;
        }
    }
</style>
<template>
    <table :class="config.className || 'table table-striped table-hover'">
        <thead>
            <tr>
                <th v-for="field in config.fields"
                    class="{{field | sortClass}}"
                    @click="triggerSort(field.sort, field, $index)">
                    <label v-if="field.sort">
                        {{field.text}}
                        <i class="m-sort-icon"></i>
                    </label>
                    <label v-else>{{field.text}}</label>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(index, item) in curData">
                <td v-for="field in config.fields">
                    <button v-for="operate in field.operates" :class="operate.className"
                            @click="triggerOperate(operate.handler, item, index)">{{operate.text}}</button>
                    {{{item[field.name] | format field.formatter item index}}}
                </td>
            </tr>
            <tr v-if="!curData">
                <td colspan="{{config.fields.length}}" class="text-center">
                    loading
                </td>
            </tr>
            <tr v-if="curData && !curData.length">
                <td colspan="{{config.fields.length}}" class="text-center">
                    没有数据
                </td>
            </tr>
        </tbody>
    </table>
    <Pagination :params="page" v-if="config.pagination"></Pagination>
</template>
<script>
import Pagination from './Pagination'
export default {
    props: {
        'config': {
            type: Object,
            required: true,
            validator: function (value) {
                return value.fields && value.fields.length
            },
            default: function () {
                return {}
                // data: 当前页的数据
                // callback: function 请求数据的参数变化
                // fields: 数据格式
                //      name:
                //      formatter
                //      sortClass
                //      sort
                //      order

                // sortClass
                // descClass
                // ascClass
                // pagination 是否分页

                // page group
                // pageSize: 每页展示的数据量
                // pageList: 可选择的每页记录数
            }
        },
        'data': {
            type: Object,
            default: function () {
                return undefined
                // data: 当前页的数据
                // total: 数据总数
                // pageNumber: 当前页数
                // pageCount: 总页数
            }
        }
    },
    data: function(){
        return {
            sort: {}
        }
    },
    components: {
        Pagination
    },
    computed: {
        curData: function() {
            return this.data.data
        },
        page: function(){
            let vm = this;
            return {
                total: vm.data.total,
                pageNumber: vm.data.pageNumber,
                pageList: vm.config.pageList,
                pageSize: vm.config.pageSize,
                callback: function(page){
                    vm.data.pageNumber = page.pageNumber;
                    vm.config.pageSize = page.pageSize;

                    vm._reload(vm._merge(page, {
                        sort: vm.sort
                    }));
                }
            }
        }
    },
    methods: {
        triggerOperate: function(handler, obj, index){
            handler && handler(obj, this.curData, index);
        },
        triggerSort: function(isSort ,field, index){
            if(!isSort) return false;

            let order = field.order == 'desc' ? 'asc' : 'desc';
            this.$set('config.fields['+ index +'].order', order);

            this.sort[field.name] = order;

            this.data.pageNumber = 1;

            // 重新请求数据
            this._reload({
                sort: this.sort,
                pageSize: this.config.pageSize,
                pageNumber: 1
            });
        },
        _reload: function(){
            let fn = this.config.callback,
                data = [];

            Object.assign(data, this.data.data);

            this.data.data = '';

            fn && fn.call(this.$parent, this._merge({
                oldData: data
            },...arguments));
        },
        _merge: function(){
            let res = {};
            Object.assign(res, ...arguments);
            return res;
        }
    },
    filters: {
        format: function(value, formatter, obj, index){
            return formatter && formatter(value, obj, this.curData, index) || value
        },
        sortClass: function(field){
            if(field.sort) {
                let vm = this,
                    res = [field.sortClass || vm.config.sortClass || 'm-sort'];

                switch (field.order) {
                    case 'desc':
                        res.push(field.descClass || vm.config.descClass || 'desc');
                        break;
                    case 'asc':
                        res.push(field.ascClass || vm.config.ascClass || 'asc');
                }
                return res.join(' ');
            }

            return ''
        }
    }
}
</script>