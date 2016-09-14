# Table
表格组件

可配置表格样式，是否排序，排序样式，操作等，以及翻页

### 接口说明

* 源文件代码

```javascript
props: {
    'config': {
        type: Object,
        required: true,
        validator: function (value) {
            return value.fields && value.fields.length
        },
        default: function () {
            return {}
        }
    }，
    'data': {
        type: Object,
        default: function () {
            return undefined
        }
    }
}
```
    注：fields为表头的配置项，必须值，不传会在控制台报错。

* config说明

    * className：表格的样式，默认值`'table table-striped table-hover'`
    
    * sortClass：可排序项的表头样式，组件内为默认值`'m-sort'`编写了初步样式
    
    * ascClass：明确指出`asc`方式排序时的表头样式，组件内为默认值`'m-sort-asc'`编写了初步样式
    
    * descClass： 明确指出为`desc`方式排序时表头的样式，组件内为默认值`'m-sort-desc'`编写了初步样式

    * sequence：序号，配置了这项则表示要显示序号，除非明确赋值 `false`, 其值非 `boolean` 时则作为表头的内容

    * pagination：配置是否分页，默认为 `false`，不显示分页
    
    * pageSize: 每页展示的数据量, Number类型或可转成Number类型的值，默认值为`pageList`的第一项
    
    * pageList：可选择的每页记录数，默认值为`[10, 20, 50]`，亦可传递如`['10', '20', '50']`

    * callback: function类型，当发生排序、页面跳转、页面展示数据条数变化时会触发该回调，函数里面的this指向当前组件
    
        - sort：Object类型，封装了发生排序的字段以及排序方式，如`{'name': 'desc', 'txt': 'asc'}`
        
        - pageSiz：每页数据条数
        
        - pageNumber：当前页数
        
    * fields：Array类型，表头项的配置
        
        - name：字段名，对应数据的字段
        
        - text：要在表头显示的内容
        
        - sort：是否是可排序字段，值为真时会显示可排序样式，可点击触发回调
        
        - sortClass：为该字段对应的表头设置独特的可排序样式
        
        - ascClass：同上类比理解
        
        - descClass：同上类比理解
        
        - order：排序方式，值为`'desc'`、`'asc'`，由于数据是由使用者传入，所以这个项只是在初始化的时候让表头显示对应的可排序样式
        
        - formatter：function类型，格式化展示数据，函数里面的this指向当前组件
        
            + 第一个参数：该字段数据的值
            
            + 第二个参数：所在行的数据对象
            
            + 第三个参数：当前页的数据数组
            
            + 第四个参数：所在行数据在当前页面数据数组中的位置
            
        例如：
        
        ```javascript
        {
            name: 'test2',
            formatter: function(value, obj, array, index){
                return '<a href="/'+value.href+'" style="color: red">'+value.txt+'</a>'
            }
        },
        ```
            注：由于返回值是直接作为html代码插入，所以请确保数据的安全性。
            
        - operates：Array类型，操作按钮数组
        
            + text：按钮上显示的内容
            
            + className：按钮的样式
            
            + isShow：是否显示该按钮
                
                当该属性为函数时，参数为该行数据对象，函数里面的this指向当前组件，明确返回false时，不显示该按钮
                
                当该属性为其他值时，只有明确给值为false，不显示改按钮
        
            + handler： function类型，按钮被点击时的回调，函数里面的this指向当前组件
            
                * 第一个参数：所在行的数据
                
                * 第二个参数：当前页的数据数组
                
                * 第三个参数：所在行数据在当前页数据数组中的位置
                
* data说明

    - data：Array类型，当前页的数据
    
    - total：数据总数
    
    - pageNumber：当前页数，如果不传，就默认为是第1页
    
    - pageCount：总页数，如果不传，则会依据`total`、`pageSize`进行计算


* 使用方法

    例如：
    
    ```javascript
    <V-table :config="params" :data="data"></V-table>
    ```
    ```javascript
    import VTable from '../components/public/Table.vue'
    export default{
        components:{
            VTable
        },
    ```

### [测试用例(暂无)]()
