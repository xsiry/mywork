Ext.define('Ninja.grid.FinanceWithGrid',{
  extend:'Ext.container.Container',
  style:{
    backgroundColor:"#C5C5C5;"
  },
  initComponent:function(){
    Ext.apply(this,{
      layout:{
        type:'border'
      },
      items:[this.createGridPanel()]
    });
    this.callParent(arguments);
  },

  createGridPanel:function(){
    var me = this;
    var store = me.createStore();
    var grid = Ext.create('Ext.grid.Panel',{
      region:'center',
      padding:'0 5 5 5',
      store:store,
      columns:me.createColumns(),
      tbar:me.createTbar(),
      bbar:me.createBbar(store)
    });
    return grid;
  },

  createColumns:function(){
    var me = this;
    var columns = {
      defaults:{
        sortable:true,
        align:"center",
        flex:1
      },
      items:[
        { xtype: 'rownumberer',width: 30,sortable: true},
        {
          text:'配资人',
          dataIndex:'customer'
        },
        {
          text:'帐号',
          dataIndex:'login'
        },
        {
          text:'当日初始资金',
          dataIndex:'current_init_capital'
        },
        {
          text:'配额',
          dataIndex:'quota'
        },
        {
          text:'风险保证金',
          dataIndex:'margin'
        },
        {
          text:'收费方式',
          dataIndex:'mode'
        },
        {
          text:'当日应收',
          dataIndex:'current_receivable'
        },
        {
          text:'当日实收',
          dataIndex:'current_paid'
        },
        {
          text:'状态',
          dataIndex:'status'
        },
        {
          text:'备注',
          dataIndex:'comment'
        }
      ]
    };
    return columns;
  },

  createStore:function(){
    var me = this;
    var store = Ext.create('Ext.data.Store', {
      fields:[
        {name: 'customer'},
        {name: 'login'},
        {name: 'current_init_capital'},
        {name: 'quota'},
        {name: 'margin'},
        {name: 'mode'},
        {name: 'current_receivable'},
        {name: 'current_paid'},
        {name: 'status'},
        {name: 'comment'}
      ],
      autoLoad:true,
      proxy:{
        url:'/finance_withs.json',
        type:'ajax',
        reader:{
          type:'json',
          root:'records'
        }
      }
    });
    return store;
  },

  createTbar:function(){
    var tbar = Ext.create('Ext.toolbar.Toolbar',{
      items: [
        {
          text:'增加配资',
          handler:function(){
            var incre_window = Ext.create('Ninja.window.NewFinanceWithWindow');
            incre_window.show();
          }
        },
        {
          text:'出账'
        },
        {
          text:'收账'
        }
      ]
    });
    return tbar;
  },

  createBbar:function(store){
    var bbar = Ext.create('Ext.toolbar.Paging', {
      store:store,
      displayInfo:true
    });
    return bbar;
  }

});