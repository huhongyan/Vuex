<template>
    <div style="margin: 100px">
        <V-table :config="params" :data="data"></V-table>
    </div>
</template>
<style>
    /*.m-sort{*/
        /*color: #660066;*/
        /*text-shadow: 2px 2px 0 rgba(0,0,0,.3);*/
        /*cursor: pointer;*/
        /*background-repeat: no-repeat;*/
        /*background-position: center;*/
    /*}*/
</style>
<script>
    import VTable from '../components/public/Table.vue'

    export default{
        components:{
            VTable
        },
        data: function() {
            return {
                params:{
                    className: 'table table-striped table-hover table-bordered',
//                    sortClass: 'm-sort',
//                    ascClass: 'm-sort-asc',
//                    descClass: 'm-sort-desc',
                    pageSize: 10,
                    pageList: [10, 20, 30, 40, 50],
                    fields: [
                        {
                            name: 'test1',
                            sort: true
                        },
                        {
                            name: 'test2',
                            formatter: function(value, obj, array, index){
                                return '<a href="/'+value.href+'" style="color: red">'+value.txt+'</a>'
                            }
                        },
                        {
                            name: 'test3',
                            sort: true,
//                            sortClass: 'm-sort-1'
                        },
                        {
                            name: 'test4',
                            sort: true,
                            order: 'desc'
                        },
                        {
                            name: 'test5'
                        },
                        {
                            name: '操作',
                            operates: [
                                {
                                    text: '催办',
                                    className: 'btn btn-default',
                                    handler: function(obj, array, index) {
                                        alert(JSON.stringify(obj));

                                    }
                                }
                            ]
                        }
                    ],
                    callback: function(arg){
                        console.log(JSON.stringify(arg))
                        let vm = this;
                        setTimeout(function(){
                            vm.data.data = [{
                                "test1": "aaa",
                                "test2": {
                                    href: "#",
                                    txt: "bbb"
                                },
                                "test3": "ccc",
                                "test4": "ddd",
                                "test5": "eee"
                            }]
                        }, 1000);

                    }
                },
                data: {
                    data: [
                        {
                            "test1": "aaa",
                            "test2": {
                                href: "#",
                                txt: "bbb"
                            },
                            "test3": "ccc",
                            "test4": "ddd",
                            "test5": "eee"
                        }, {
                            "test1": "aaa",
                            "test2": {
                                href: "#",
                                txt: "bbb"
                            },
                            "test3": "ccc",
                            "test4": "ddd",
                            "test5": "eee"
                        }, {
                            "test1": "aaa",
                            "test2": {
                                href: "#",
                                txt: "bbb"
                            },
                            "test3": "ccc",
                            "test4": "ddd",
                            "test5": "eee"
                        }, {
                            "test1": "aaa",
                            "test2": {
                                href: "#",
                                txt: "bbb"
                            },
                            "test3": "ccc",
                            "test4": "ddd",
                            "test5": "eee"
                        }
                    ],
                    total: 165,
                    pageNumber: 1
                }
            }
        }
    }
</script>
