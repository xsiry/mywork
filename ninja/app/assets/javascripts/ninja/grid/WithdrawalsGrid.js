Ext.define("Ninja.grid.WithdrawalsGrid",{
  extend : "Ext.grid.Panel",
  columnLines: true,
  title: "客户出金请求列表",
  enableColumnMove: false,
  enableColumnHide:false,
  
  viewConfig: {
    stripeRows: true
  },
  initComponent:function(){
    var store = this.createStore();
    var columns = this.createColumns();
    Ext.apply(this,{
      columns: columns,
      store: store,
      bbar: this.createBbar(store)
    });
    this.callParent(arguments);
  },
  listeners:{
    afterrender:function(){
      var ds = this.getStore();
      ds.load();
    }
  },
  
  /*
  * 创建列
  */
  createColumns:function(){
    var columns = {
      defaults:{
        sortable: true,
        align: "left"
      },
      items:[
        { xtype: 'rownumberer',width: 30,sortable: false},
        { header: "帐号",    dataIndex:"login", flex: 1 },
        { header: "时间",    dataIndex: "updated_at", flex: 1, xtype: 'datecolumn', format:"Y-m-d H:i:s"},
        { header: "开户银行", dataIndex: "bank", flex: 1,
          renderer: function(value){
            if(!Ext.isEmpty(value)){
              var bankAccount = value.split("-");
              switch (bankAccount[0]) {
                case "ICBC"   : return "中国工商银行-" + bankAccount[1];
                case "CMBC"   : return "招商银行-" + bankAccount[1];
                case "CCB"    : return "中国建设银行-" + bankAccount[1];
                case "ABC"    : return "中国农业银行-" + bankAccount[1];
                case "BOC"    : return "中国银行-" + bankAccount[1];
                case "BOCOM"  : return "交通银行-" + bankAccount[1];
                case "HXB"    : return "华夏银行-" + bankAccount[1];
                case "CIB"    : return "兴业银行-" + bankAccount[1];
                case "CMSB"   : return "中国民生银行(卡)-" + bankAccount[1];
                case "CMSB_2" : return "中国民生银行(网银)-" + bankAccount[1];
                case "GDB"    : return "广发银行-" + bankAccount[1];
                case "PAB"    : return "平安银行-" + bankAccount[1];
                case "SHDB"   : return "上海浦东发展银行-" + bankAccount[1];
                case "ZXB"    : return "中信银行-" + bankAccount[1];
                case "CEB"    : return "中国光大银行-" + bankAccount[1];
                case "UP"     : return "银联-" + bankAccount[1];
                default      : value;
              };
            }
            return "";
          }
        },
        { header: "银行帐号", dataIndex: "bank_account", flex: 1},
        { header: "状态",    
          dataIndex: "status",       
          flex: 1,
          renderer: function(value){
            if(value == 0){
              return "未处理";
            }
            return "处理中...";
          }
        }
      ]
    };
    return columns;
  },
  
  createStore: function(){
    var me = this;
    me.store = Ext.create('Ext.data.Store', {
      fields:[
        {name: 'login'},
        {name: 'updated_at'},
        {name: 'bank'},
        {name: 'bank_account'},
        {name: 'status'}
      ],
      proxy: {
        type: 'ajax',
        url: '/withdrawals/get.json',
        reader: {
          type: 'json',
          root: 'records'
        },
        simpleSortMode: true
      },
      sorters: [{
        property: 'updated_at',
        direction: 'DESC'
      }],
      listeners: {
        beforeLoad: function(store){
          store.removeAll(false);
        }
      }
    })
    return me.store;
  },

  /*
  *  创建底部工具栏
  */
  createBbar:function(store){
    var bbar = Ext.create('Ext.toolbar.Paging', {
      store: store,
      displayInfo: true
    });
    return bbar;
  }
});
