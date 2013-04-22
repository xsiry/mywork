Ext.define('Ninja.grid.InvestorGroupMembers',{
  extend:'Ext.grid.Panel',
  title:'组成员',
  itemId:'groupMembers',
  border:0,
  multiSelect:true,
  split:true,
  columnLines: true,
  initComponent: function(){
    var me  = this,
   
    store   = me.createStore(),
    columns = me.createColumns(),
    tbar    = me.createTbar(),
    bbar    = me.createBbar(store);
    
    Ext.apply(me, {
      columns: columns,
      store: store,
      tbar: tbar,
      bbar: bbar
    }); 
    me.callParent(arguments); 
    me.on('selectionchange',function(cmp, records){
      if(records.length > 0){
        me.down("#removeMembers").setDisabled(false);
      }else{
        me.down("#removeMembers").setDisabled(true);
      }
    });
  },

  createColumns: function(){
    var columns = {
      defaults:{
        sortable: true,
        align: "center"
      },
      items:[
        { xtype:'rownumberer',width: 30,sortable: false},
        {text:'帐号', dataIndex:'login', flex:1},
        {text:'姓名', dataIndex:'name', flex:1}
      ]};
    return columns;
  },
  
  
  // 创建 数据源
  createStore: function(){
    var me = this;
    me.store = Ext.create('Ext.data.Store', {
      pageSize: 25,
      fields:[
        {name: 'id'},{name: 'name'},{name: 'login'}
      ],
      autoLoad: false,
      proxy: {
        type: 'ajax',
        reader: {
          type: 'json',
          root: 'records'
        }
      },
      listeners: {
        beforeLoad: function(ds){
          ds.removeAll(false);
        }
      }
    });
    return me.store;
  },

  createTbar:function(){
    var me = this;
    var tbar = Ext.create('Ext.toolbar.Toolbar',{
      items:[
        {
          text:'添加',
          handler:function(){
            var investorsGroup = Ext.ComponentQuery.query("#investorsGroup")[0];
            var groupName = investorsGroup.getSelectionModel().getSelection()[0].get('name');
            var title = "添加成员到" + groupName + "组";
            Ext.create('Ninja.window.ImportInvestorsWindow',{
              title:title,
              token:'investorsGroup'
            }).show();
          }
        },
        {
          text:'删除',
          itemId:'removeMembers',
          disabled:true,
          handler:function(){
            me.deleteGroupMembers();
          }
        }
      ]
    });
    return tbar;
  },

  createBbar:function(store){
    var bbar = Ext.create('Ext.toolbar.Paging', {
      store: store,
      displayInfo: true
    });
    return bbar;
  },

  deleteGroupMembers:function(){
    var me = this;
    var sm = me.getSelectionModel().getSelection();
    var logins = [];
    var investor_ids = [];
    for(var i=0;i<sm.length;i++){
      logins.push(sm[i].get('login'));
      investor_ids.push(sm[i].get('id'));
    }
    var investorsGroup = Ext.ComponentQuery.query("#investorsGroup")[0];
    var group = investorsGroup.getSelectionModel().getSelection()[0];
    var id = group.get('id');
    var name = group.get('name');
    Ext.Msg.confirm('提示', "确定从“" + name + "”组删除(" + logins.toString() +")成员吗？", function(btn){
      if (btn == 'yes'){
        Ext.Ajax.request({
          url: '/groups/leave.json',
          method: 'DELETE',
          params:{
            'group_id'    : id,
            'investor_ids': Ext.encode(investor_ids)
          },
          success: function(response){
            var text = Ext.JSON.decode(response.responseText);
            if(text && text != "") {
              if(text.success){
                me.getStore().load();
              }else{
                Ext.create('Ninja.window.NotificationWindow', {
                  html:"删除成功",
                }).show();
              }
            }else{
              Ext.create('Ninja.window.NotificationWindow', {
                html:'你删除的数据不存在,请确认后再操作',
                iconCls:'ux-notification-icon-error'
              }).show();
            }
          }
        });
      }
    });
  }

});