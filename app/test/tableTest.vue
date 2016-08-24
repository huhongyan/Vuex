<template>
    <div style="margin: 100px">
        <V-table :config="params" :data="data"></V-table>
    </div>
</template>
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
                    //pageSize: 10,
                    //pageList: [10, 20, 30, 40, 50],
                    pagination: true
                    ,
                    fields: [
                        {
                            name: 'test1',
                            text: 't1',
                            sort: true
                        },
                        {
                            name: 'test2',
                            text: 't2',
                            formatter: function(value, obj, array, index){
                                return '<a href="/'+value.href+'" style="color: red">'+value.txt+'</a>'
                            }
                        },
                        {
                            name: 'test3',
                            text: 't3',
                            sort: true
                        },
                        {
                            name: 'test4',
                            text: 't4',
                            sort: true,
                            order: 'desc'
                        },
                        {
                            name: 'test5',
                            text: 't5'
                        },
                        {
                            name: '',
                            text: '操作',
                            operates: [
                                {
                                    text: '催办',
                                    className: 'btn btn-default',
                                    handler: function(obj, array, index) {
                                        console.log(arguments)
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
