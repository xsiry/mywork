Ext.define('Ninja.grid.PaymentsGrid',{
  extend:'Ext.grid.Panel',
  title:'支付列表',
  border:0,
  viewConfig:{
    stripeRows:true
  },
  mixins: {
    formatter: 'Ninja.util.Formatter'
  },
  initComponent:function(){
    var me  = this,
      store   = me.createStore(),
      tbar    = me.createTbar(store),
      bbar    = me.createBbar(store),
      columns = me.createColumns();
    Ext.apply(me, {
      tbar: tbar,
      bbar: bbar,
      columns: columns,
      store: store
    }); 
    me.callParent(arguments);
  },
  listeners:{
    afterrender:function(cmp){
      cmp.requestInterval = 30000;
      cmp.task = {
        run: function(){
          var store = cmp.getStore();
          var proxy = store.getProxy();
          proxy.url = '/payments/get.json';
          store.load();
        },
        interval: cmp.requestInterval //请求间隔时间
      }
      cmp.refresh();
      cmp.buildTask(cmp.requestInterval/1000);
    },
    hide:function(cmp){
      cmp.stopRefresh();
    },
    destroy:function(cmp){
      cmp.stopRefresh();
    }
  },

  createColumns:function(){
    var me = this;
    var columns = {
      defaults:{
        sortable:true
      },
      items:[
        {text:'帐号', dataIndex:'customer', width:120},
        {text:'IP地址', dataIndex:'ip_address', width:150},
        {text:'商品', dataIndex:'goods', width:100},
        {text:'订单编号', dataIndex:'order_num', width:180},
        {text:'交易额', dataIndex:'total', width:160, renderer:me.formatPrice},
        {text:'支付状态', dataIndex:'status', width:160, 
          renderer:function(value, meta){
            if(value == 1){
              meta.style += "color:green;";
              return "支付成功";
            }else if(value == -1){
              meta.style += "color:red;";
              return "支付失败";
            }else{
              return "正在支付";
            }
          }
        },
        {text:'支付时间', dataIndex:'created_at', width:200, xtype:'datecolumn', format:'Y-m-d H:i:s'},
        {text:'支付成功时间', dataIndex:'success_time', width:200, xtype:'datecolumn', format:'Y-m-d H:i:s'},
        {text:'备注', dataIndex:'comment', flex:1}
      ]
    };
    return columns;
  },

  createStore:function(){
    var me = this;
    var store = Ext.create('Ext.data.Store',{
      fields:['customer', 'ip_address', 'order_num', 'total', 
              'comment', 'status', 'goods', 'created_at', 'success_time'],
      autoLoad:false,
      proxy:{
        type:'ajax',
        url:'/payments/get.json',
        reader:{
          type:'json',
          root:'records'
        }
      },
      listeners: {
        beforeLoad: function(ds){
          ds.removeAll(false);
        }
      }
    });
    return store;
  },

  createTbar:function(store){
    var me = this;
    var tbar = Ext.create('Ext.toolbar.Toolbar', {
      items: [
        {
          text:'手动刷新',
          handler:function(){
            me.runner.stopAll();
            me.down("#countdown").setText('');
            me.stopRefresh();
            me.down("#autoRefresh").setValue("stop");
            store.getProxy().url = "/payments/get.json";
            store.load();
          }
        },
        {
          xtype:'combo',
          itemId:'autoRefresh',
          fieldLabel:'自动刷新间隔',
          labelWidth:80,
          width:160,
          editable:false,
          displayField:'name',
          valueField:'value',
          value:'30000',
          store:Ext.create('Ext.data.Store',{
            fields:['name','value'],
            data:[
              {name:'停止刷新',value:'stop'},
              {name:'30秒',value:'30000'},
              {name:'1分钟',value:'60000'},
              {name:'2分钟',value:'120000'},
              {name:'3分钟',value:'180000'},
              {name:'4分钟',value:'240000'},
              {name:'5分钟',value:'300000'},
              {name:'10分钟',value:'600000'},
              {name:'15分钟',value:'900000'},
              {name:'20分钟',value:'1200000'}
            ]
          }),
          listeners:{
            change:function(cmp, newValue, oldValue){
              if(newValue == "stop"){
                me.stopRefresh();
                me.runner.stopAll();
                me.down("#countdown").setText('');
              }else{
                me.stopRefresh();
                var interval = Ext.Number.from(newValue, 30000);
                me.task.interval = interval;
                me.refresh();
                me.reconfigure(interval/1000);
              }
            }
          }
        },
        {
          xtype:'label',
          itemId:'countdown'
        },
        "->",
        Ext.create('Ext.ux.form.SearchField', {
          fieldLabel: '搜索',
          labelWidth: 35,
          width: 200,
          margin: '0 5 0 0',
          store: store,
          searchURL:'/payments/search.json'
        })
      ]
    });
    return tbar;
  },

  createBbar:function(store){
    var bbar = Ext.create('Ext.toolbar.Paging',{
      store:store,
      displayInfo:true
    });
    return bbar;
  },

  refresh: function(){
    Ext.TaskManager.start(this.task);
  },

  stopRefresh: function(){
    Ext.TaskManager.stop(this.task);
  },

  buildTask: function(countDown){
    var me = this;
    me.runner = new Ext.util.TaskRunner();
    me.clockTask = {
      countDown:countDown,
      refreshInterval:countDown,
      interval:1000,
      scope:me,
      run:function(){
        me.clockTask.countDown--;
        if(me.clockTask.countDown < 0){
          me.clockTask.countDown = me.clockTask.refreshInterval-1;
        }
        me.refreshCountDown(me.clockTask.countDown);
      }
    }
    me.runner.start(me.clockTask);
  },

  reconfigure: function(value){
    var me = this;
    me.runner.stopAll();
    me.clockTask.refreshInterval = value;
    me.clockTask.countDown = value;
    me.runner.start(me.clockTask);
  },

  refreshCountDown: function(countDown){
    var me = this;
    var text;
    if(countDown > 60){
      var minutes = Math.floor(countDown/60);
      var seconds = countDown%60;
      text = "还有" + minutes + "分" + seconds + "秒开始刷新";
    }else{
      text = "还有" + countDown + "秒开始刷新";
    }
    me.down("#countdown").setText(text);
  }

});