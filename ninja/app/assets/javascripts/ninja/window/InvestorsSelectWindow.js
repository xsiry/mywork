Ext.define('Ninja.window.InvestorsSelectWindow',{
  extend:'Ext.window.Window',
  title:'选择投资者',
  closeAction:'hide',
  resizable:false,
  draggable:true,
  modal:true,
  width:600,
  height:370,
  border:0,
  layout:'fit',
  initComponent:function(){
    this.items = [this.createInvestorsGrid()];
    this.buttons = this.createButtons();
    this.callParent(arguments);
  },

  createInvestorsGrid:function(){
    var me = this;
    var store = me.createStore();
    var investorGrid = Ext.create('Ext.grid.Panel',{
      store:store,
      columns:me.createColumns(),
      tbar:me.createTbar(store),
      bbar:me.createBbar(store)
    });
    return investorGrid;
  },

  createColumns: function(){
    var columns = {
      defaults:{
        sortable:true,
        align:"center"
      },
      items:[
        {xtype:'rownumberer', width:30, sortable:false},
        {text:'账号', dataIndex:'login', flex:1},
        {text:'姓名', dataIndex:'name', flex:1}
      ]};
    return columns;
  },
  
  createStore: function(){
    var me = this;
    me.store = Ext.create('Ext.data.Store',{
      fields:[{name: 'login'}, {name: 'name'}],
      autoLoad:true,
      proxy:{
        url:'/investors/show_investors.json',
        type:'ajax',
        reader:{
          type:'json',
          root:'records'
        }
      },
      listeners:{
        beforeLoad:function(ds){
          ds.removeAll(false);
        }
      }
    });
    return me.store;
  },

  createTbar:function(store){
    var tbar = Ext.create('Ext.toolbar.Toolbar',{
      items:[
        "->",
        Ext.create('Ext.ux.form.SearchField', {
          fieldLabel:'搜索',
          labelWidth:35,
          width:200,
          margin:'0 5 0 0',
          store:store,
          searchURL:'/investors/search.json'
        })
      ]
    });
    return tbar;
  },

  createBbar:function(store){
    var bbar = Ext.create('Ext.toolbar.Paging',{
      store:store,
      displayInfo: true
    });
    return bbar;
  },

  createButtons:function(){
    var me = this;
    var buttons = [
      {
        text:'确定',
        handler:function(){
          me.close();
        }
      },
      {
        text:'取消',
        handler:function(){
          me.close();
        }
      }
    ];
    return buttons;
  }

});