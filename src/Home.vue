<template>
     <div class="container">
        <div style="padding:25px;">
         <el-form label-width="200px" v-model="attrs" style="width: 100%">

             <el-form-item label="商品库存信息">

                 <el-link type="primary" @click="showQuest">商品规格和库存知识谱及</el-link>

              </el-form-item>

          <el-form-item label="划线价批量设置">
             <div class="block">
                 <el-slider
                   v-model="underline_ratio"
                   step=0.1
                   show-input
                   :max="20" @change="underline_change"
                   >
                 </el-slider>
               </div>
          </el-form-item>

           <el-form-item label="销售价价批量设置">
                       <div class="block">
                           <el-slider
                             v-model="sale_ratio"
                             step=0.1
                             show-input
                             :max="20"
                             @change="sale_change"
                             >
                           </el-slider>
                         </div>
           </el-form-item>

           <el-form-item label="商品体积批量设置">
                  <el-col :span="5">
                     <el-input v-model="volume"></el-input>

                  </el-col>
                  <el-col :span="4">
                   &nbsp;<el-button type="primary" size="mini" @click="volume_set">确定</el-button>
                  </el-col>
           </el-form-item>

           <el-form-item label="商品重量批量设置">
                <el-col :span="5">
                   <el-input v-model="weight"></el-input>
                </el-col>
                <el-col :span="4">
                    &nbsp;<el-button type="primary" size="mini" @click="weight_set">确定</el-button>
                 </el-col>
           </el-form-item>


           <el-form-item label="商品库存存批量设置">
                           <el-col :span="5">
                              <el-input v-model="stock"></el-input>
                           </el-col>
                           <el-col :span="4">
                               &nbsp;<el-button type="primary" size="mini" @click="stock_set">确定</el-button>
                            </el-col>
           </el-form-item>


           <el-form-item style="width: 100%" label-width="10px">

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


           </el-form-item>



           <el-form-item>

           <el-button type="info" @click="back">返回列表</el-button>

           <el-button type="primary" @click="save">保存设置</el-button>

           </el-form-item>

       </el-form>

     </div>


    </div>


</template>

<script>

export default {

  name: 'skuSet',
  data() {
    return {


            tableDatas: {

            fields: [

             {'prop': 'standard_price', 'name':'标准价(元)' },
              {'prop': 'underline_price', 'name':'划线价(元)' },
             {'prop': 'sale_price', 'name':'销售价(元)' },
             {'prop': 'volume', 'name':'体积(立方米)' },
             {'prop': 'weight', 'name':'重量(KG)' },
             {'prop': 'stock', 'name':'库存' }
            ],
            tableData: []



          },

        direct: 1, // 2 代表是修改操作 sale_ratio + underline_ratio要隐藏
        sale_ratio: 0.8,
        underline_ratio: 0.8,
        weight_ratio: 0.1,
        volume: 0.1,
        weight: 0.1,
        stock: 1,

        merchandise: {},

        // 商品属性
        attrs: [{"volume":"0.1","key_ids":[{"key_id":10494,"key":"包装"},{"key_id":10498,"key":"产地 "},{"key_id":10501,"key":"档次"}],"standard_price":1.00,"underline_price":1.10,"values":[{"value_id":10497,"value":"1支装"},{"value_id":10500,"value":"顺德陈村"},{"value_id":10502,"value":"标准"}],"weight":"0.1","model":"4x2x2","id":10929,"value_ids":[10497,10500,10502],"stock":"30","sale_price":1.00},{"volume":"0.1","key_ids":[{"key_id":10494,"key":"包装"},{"key_id":10498,"key":"产地 "},{"key_id":10501,"key":"档次"}],"standard_price":1.00,"underline_price":1.10,"values":[{"value_id":10497,"value":"1支装"},{"value_id":10500,"value":"顺德陈村"},{"value_id":10503,"value":"高档"}],"weight":"0.1","model":"4x2x2","id":10930,"value_ids":[10497,10500,10503],"stock":"30","sale_price":1.00},{"volume":"0.1","key_ids":[{"key_id":10494,"key":"包装"},{"key_id":10498,"key":"产地 "},{"key_id":10501,"key":"档次"}],"standard_price":1.00,"underline_price":1.10,"values":[{"value_id":10497,"value":"1支装"},{"value_id":10499,"value":"顺德大良"},{"value_id":10502,"value":"标准"}],"weight":"0.1","model":"4x2x2","id":10931,"value_ids":[10497,10499,10502],"stock":"30","sale_price":1.00},{"volume":"0.1","key_ids":[{"key_id":10494,"key":"包装"},{"key_id":10498,"key":"产地 "},{"key_id":10501,"key":"档次"}],"standard_price":1.00,"underline_price":1.10,"values":[{"value_id":10497,"value":"1支装"},{"value_id":10499,"value":"顺德大良"},{"value_id":10503,"value":"高档"}],"weight":"0.1","model":"4x2x2","id":10932,"value_ids":[10497,10499,10503],"stock":"30","sale_price":1.00},{"volume":"0.1","key_ids":[{"key_id":10494,"key":"包装"},{"key_id":10498,"key":"产地 "},{"key_id":10501,"key":"档次"}],"standard_price":1.00,"underline_price":1.10,"values":[{"value_id":10496,"value":"2支装"},{"value_id":10500,"value":"顺德陈村"},{"value_id":10502,"value":"标准"}],"weight":"0.1","model":"4x2x2","id":10933,"value_ids":[10496,10500,10502],"stock":"30","sale_price":1.00},{"volume":"0.1","key_ids":[{"key_id":10494,"key":"包装"},{"key_id":10498,"key":"产地 "},{"key_id":10501,"key":"档次"}],"standard_price":1.00,"underline_price":1.10,"values":[{"value_id":10496,"value":"2支装"},{"value_id":10500,"value":"顺德陈村"},{"value_id":10503,"value":"高档"}],"weight":"0.1","model":"4x2x2","id":10934,"value_ids":[10496,10500,10503],"stock":"30","sale_price":1.00},{"volume":"0.1","key_ids":[{"key_id":10494,"key":"包装"},{"key_id":10498,"key":"产地 "},{"key_id":10501,"key":"档次"}],"standard_price":1.00,"underline_price":1.10,"values":[{"value_id":10496,"value":"2支装"},{"value_id":10499,"value":"顺德大良"},{"value_id":10502,"value":"标准"}],"weight":"0.1","model":"4x2x2","id":10935,"value_ids":[10496,10499,10502],"stock":"30","sale_price":1.00},{"volume":"0.1","key_ids":[{"key_id":10494,"key":"包装"},{"key_id":10498,"key":"产地 "},{"key_id":10501,"key":"档次"}],"standard_price":1.00,"underline_price":1.10,"values":[{"value_id":10496,"value":"2支装"},{"value_id":10499,"value":"顺德大良"},{"value_id":10503,"value":"高档"}],"weight":"0.1","model":"4x2x2","id":10936,"value_ids":[10496,10499,10503],"stock":"30","sale_price":1.00},{"volume":"0.1","key_ids":[{"key_id":10494,"key":"包装"},{"key_id":10498,"key":"产地 "},{"key_id":10501,"key":"档次"}],"standard_price":1.00,"underline_price":1.10,"values":[{"value_id":10495,"value":"3支装"},{"value_id":10500,"value":"顺德陈村"},{"value_id":10502,"value":"标准"}],"weight":"0.1","model":"4x2x2","id":10937,"value_ids":[10495,10500,10502],"stock":"30","sale_price":1.00},{"volume":"0.1","key_ids":[{"key_id":10494,"key":"包装"},{"key_id":10498,"key":"产地 "},{"key_id":10501,"key":"档次"}],"standard_price":1.00,"underline_price":1.10,"values":[{"value_id":10495,"value":"3支装"},{"value_id":10500,"value":"顺德陈村"},{"value_id":10503,"value":"高档"}],"weight":"0.1","model":"4x2x2","id":10938,"value_ids":[10495,10500,10503],"stock":"30","sale_price":1.00},{"volume":"0.1","key_ids":[{"key_id":10494,"key":"包装"},{"key_id":10498,"key":"产地 "},{"key_id":10501,"key":"档次"}],"standard_price":1.00,"underline_price":1.10,"values":[{"value_id":10495,"value":"3支装"},{"value_id":10499,"value":"顺德大良"},{"value_id":10502,"value":"标准"}],"weight":"0.1","model":"4x2x2","id":10939,"value_ids":[10495,10499,10502],"stock":"30","sale_price":1.00},{"volume":"0.1","key_ids":[{"key_id":10494,"key":"包装"},{"key_id":10498,"key":"产地 "},{"key_id":10501,"key":"档次"}],"standard_price":1.00,"underline_price":1.10,"values":[{"value_id":10495,"value":"3支装"},{"value_id":10499,"value":"顺德大良"},{"value_id":10503,"value":"高档"}],"weight":"0.1","model":"4x2x2","id":10940,"value_ids":[10495,10499,10503],"stock":"30","sale_price":1.00}]


      }

  },
  computed: {

     datas: {
        get() {
          return this.attrs
        },
        set(v) {

           this.attrs = v

        }


     }



  },



  created() {


     this.loadMer()




  },

  methods: {

    // 当前行row、当前列column、当前行号rowIndex、当前列号columnIndex四个属性。
    // 该函数可以返回一个包含两个元素的数组，第一个元素代表rowspan，第二个元素代表colspan。 也可以返回一个键名为rowspan和colspan的对象。


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



     showQuest() {
        console.log('--->showQuest goes <------');
       this.$notify({
                 title: '提示',
                 message: '1,库存不设置则商品库存不生效; 2, 库存设置后，商品的库存立即生效;3, 即使未设置库存，商品的规格在任何时候都生效; 4,商品规格需要在商品分类中去设置',
                 duration: 200000
               });

     },
     underline_change(data){

       console.log('--->  underline_change data ='+JSON.stringify(data));
       this.underline_ratio = data;
       this.adjust_price();

     },

      sale_change(data){

         console.log('--->  sale_change data ='+JSON.stringify(data));
         this.sale_ratio = data;
         this.adjust_price();

     },



     weight_set() {


                  this.attrs.forEach( attr=> {

                        attr.weight = this.weight;


                    });

      },
      volume_set() {


             this.attrs.forEach( attr=> {

                   attr.volume = this.volume;


               });

      },

      stock_set() {


        this.attrs.forEach( attr=> {

           attr.stock = this.stock;


       });

      },

     adjust_price() {

        this.attrs.forEach( attr=> {
              console.log('---> attr.standard_price='+JSON.stringify(attr));
              attr.underline_price = this.comput_price ( attr.standard_price * this.underline_ratio);
              attr.sale_price = this.comput_price ( attr.standard_price * this.sale_ratio);

          });

     },



     save() {



     },
     back() {



     },

     loadMer() {



         this.attrs.forEach( attr=> {
          if ( !attr.underline_price ){
             attr.underline_price = this.comput_price ( attr.standard_price * this.underline_ratio);

           }
           if ( ! attr.sale_price) {

             attr.sale_price = this.comput_price ( attr.standard_price * this.sale_ratio);
           }

       });



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


            // console.log('--> attrs ='+JSON.stringify(this.attrs));
            console.log('--> this.tableDatas.fields ='+JSON.stringify(this.tableDatas.fields));
            this.tableDatas.tableData = this.attrs;

     },

     comput_price( price ) {

           return  price.toFixed(2);
     },

      comput_volume( volume ) {

                return  volume.toFixed(2);
      }

  },
  components:
  {


  }
}
</script>

<style lang="stylus" scoped>


 .container {

          padding: 20px;
      }

</style>
