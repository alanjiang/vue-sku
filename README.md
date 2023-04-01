#  SKU（商品最小单元）Element UI 设计

 

 作者 微信号: comeon_betty 

网上有SKU算法的文章，抄袭的较多， 算法均较为复杂。 本文从简单易懂的角度利用数学归纳演绎法推导出SKU算法的规律。



# 本项目演示(How to run this project?)



```
git clone https://github.com/alanjiang/vue-sku.git
cd vue-sku
npm install 
npm run dev 
```

本项目源码稍加改造即可产品化。

The project can be made to product with little  adjust. 



#  1 SKU算法 

  

   在商品设置规格的时候，最大的难点在于解决表格的动态表头及动态单元格合并以及两大问题。

## 1.1 如何解决动态单元格合并的问题



动态表头部分取决于商品规格的维度，我们将商品规格的维度用Cn（n=1,2,...N) 表示，其中，n 表示商品规格的维度。 使用归纳演绎法推导。

(1) 当 n = 1 ，表求商品规格只有一个维度。

如下图，商品规格仅一个维度：包装，包装属性下面共有2个属性值，总记录2条， 无需合并单元格。



![](https://coding-2020.s3.cn-northwest-1.amazonaws.com.cn/assets/sku1.png)



（2） 当 n =2 时， 即商品有2个规格维度。  如下图所示，商品有包装、产地两个规格维度。 包装规格下有“1支装”、“2支装”、“3支装”3个属性值；产地规格下有“广州番禺”、“佛山顺德”、“中山香山” 3个属性值。

总共产生迪卡尔集记录 N  =  C1 (3)  x  C2(3) = 3 x 3 = 9 条记录； 

合并单元格规律： 第1列每 C2 (3) ，即每3 行合并单元格。



![](https://coding-2020.s3.cn-northwest-1.amazonaws.com.cn/assets/sku2.png)



（3） 当 n =3 时， 即商品有3个规格维度。  如下图所示，商品有包装、产地、档次3个规格维度。 包装规格下有“1支装”、“2支装”、“3支装”3个属性值，记为 C1(3)；产地规格下有“顺德陈村”、“佛山大良”2个属性值，记为C2(2)；档次规格下有“标准”、“高档”2个属性值，记为 C3(2) ，共产生迪卡尔集记录 N =  C1(3) x C2(2) x C3(2) = 12 条记录。

 合并单元格规律： 第1列每 C2 (2) x C3 (2)，即每 2 x 2 =4  行合并单元格；

​                                 第2列每C3(2)，即每2行合并单元格。



![](https://coding-2020.s3.cn-northwest-1.amazonaws.com.cn/assets/sku3.png)



结论： 由此可以推导出单元格合并规律：

Cn (n = 4 ) 时， 第1列每 C3 x C2 x C1 行进行合并； 

​                            第2 列每  C2 x C1 行进行合并； 

​                            第3 列每   C1 行进行合并；



其他依次类推。



掌握单元格合并规律后，可以结合Element UI 动态单元格合并完成动态单元格合并。  

参考代码如下： 

```

  colSpanMethod({ row, column, rowIndex, columnIndex }) {

           console.log('--> row ='+JSON.stringify(row));
           if ( !row || !row.model) {
               return ;
           }
           let array = row.model.split("x");
           let size = array.length;
           console.log('---> size='+size);

           if ( size == 3) { // 3个属性

             return this.columnHandler3( row, column, rowIndex, columnIndex , array);

           }else if (size == 2){ // 2个属性

                return this.columnHandler2( row, column, rowIndex, columnIndex , array);
           }
           else if (size == 1){ // 1个属性


          }


      },

       columnHandler3( row, column, rowIndex, columnIndex, array ) {

        let c2 = Number(array[1]);
        let c3 = Number(array[2]);

        if (columnIndex === 0)
        {
                if (rowIndex % (c2 * c3) === 0)
                {
                          return { rowspan: c2 * c3, colspan: 1 }
                }
               return { rowspan: 0, colspan: 0, }

         }else if ( columnIndex  === 1) {

              if (rowIndex % c3 === 0)
              {
                 return { rowspan: c3, colspan: 1}
              }

              return { rowspan: 0, colspan: 0, }

       }


      },

      columnHandler2( row, column, rowIndex, columnIndex, array ) {

              let c2 = Number(array[1]);

              if (columnIndex === 0)
              {
                      if (rowIndex % c2 === 0)
                      {
                                return { rowspan: c2, colspan: 1 }
                      }
                     return { rowspan: 0, colspan: 0, }

               }


       },
```



## 1.2 如何解决动态单元格合并的问题



先看表格，将表格的数据分为表头部分和记录集合部分，表头部分见：  tableDatas.fields。 做法是先把固定的表头属性字段固定在集合中，数据如下：

```
tableDatas: {

fields: [

 {'prop': 'standard_price', 'name':'标准价(元)' },
  {'prop': 'underline_price', 'name':'划线价(元)' },
 {'prop': 'sale_price', 'name':'销售价(元)' },
 {'prop': 'volume', 'name':'体积(立方米)' },
 {'prop': 'weight', 'name':'重量(KG)' },
 {'prop': 'stock', 'name':'库存' }
],

```



对于动态属性的字段，如：包装、产地这些动态属性字段，可以在原有的  attrs 属性的基础上进一步处理：

```
this.attrs.forEach( attr => {

            for( var i = 0; i < attr.key_ids.length; i++ ) {

               attr['cap'+(i+1)] = attr.key_ids[i].key;

              }
             for( var i = 0; i < attr.values.length; i++ ) {

                attr['prop'+(i+1)] = attr.values[i].value;
              }



            });

           let attr = this.attrs[0];

           for( var i = attr.values.length; i > 0 ; i-- ) {

              this.tableDatas.fields.unshift({'prop': 'prop'+i, 'name': attr['cap'+i]});

            }

```



 tableDatas.fields 处理成如下动态属性：

```
[{"prop":"prop1","name":"包装"},{"prop":"prop2","name":"产地"},{"prop":"standard_price","name":"标准价(元)"},{"prop":"underline_price","name":"划线价(元)"},{"prop":"sale_price","name":"销售价(元)"},{"prop":"volume","name":"体积(立方米)"},{"prop":"weight","name":"重量(KG)"},{"prop":"stock","name":"库存"}]
```



 再通过 <el-table >  来渲染数据，提取动态表头及字段值： 如：scope.row[item.prop] 。

并可以将表格的部分需要输入数据的字段也作处理。见完整的表格数据处理。其中： colSpanMethod是动态单元格合并的算法。见前面介绍。

```
<el-table :data="tableDatas.tableData" border style="width: 100%"
                         :span-method="colSpanMethod">
                           <el-table-column
                             v-for="(item,index) in tableDatas.fields"
                             :key="index"
                             :label="item.name"
                             :prop="item.prop"
                             width=120
                           >
                             <template slot-scope="scope">
                               <div v-if=" item.prop == 'sale_price' || item.prop == 'underline_price' || item.prop == 'volume' || item.prop == 'weight' || item.prop == 'stock'">
                                  <el-input v-model="scope.row[item.prop]"></el-input>
                               </div>
                               <div v-else>{{scope.row[item.prop]}}</div>
                             </template>
                           </el-table-column>
             </el-table>
```



# 2  SKU在小程序端效果



![](https://coding-2020.s3.cn-northwest-1.amazonaws.com.cn/assets/mini.jpeg)





完整的演示请体验小程序



![](https://coding-2020.s3.cn-northwest-1.amazonaws.com.cn/assets/mini-example.jpeg)