//柜员详情列表
Ext.define('Ninja.grid.AdminsGrid', {
	extend:'Ext.grid.Panel',
	columnLines:true,
	enableColumnMove:false,
	enableColumnHide:false,
	viewConfig: {
		stripeRows:true
	},
	initComponent: function(){

		var store  = this.createStore();
		Ext.apply(this,{
			columns: this.createColumns(),
			store: store,
			bbar: this.createBbar(store),
			tbar: this.createTbar(store)
		});
		this.callParent(arguments);
	},
	listeners:{
		afterrender: function(){
			var ds = this.getStore();
	  		ds.load();
		}
	},
	//创建表格列
	createColumns: function(){
		var columns = {
			defaults:{
				sortable: true,
				align: "center"
			},
			items:[
				{ xtype: 'rownumberer',width: 30,sortable: false},
				{text: '帐号',  dataIndex:'login', flex:1},
				{text: '姓名',  dataIndex:'name', flex:1},
				{text: '角色',  dataIndex:'role_id',flex:1},  
				{text: '备注',  dataIndex:'comment',flex:1},
				{text: '标签1', dataIndex:'',flex:1},
				{text: '标签2', dataIndex:'',flex:1}
			]};
		return columns;
	},

	//创建数据源
	createStore: function(){
		var me = this;
		me.store = Ext.create('Ext.data.Store',{
			fields:[
				{name: 'login'},
				{name: 'name'},
				{name: 'role_id'},
				{name: 'comment'},
				{name: ''},
				{name: ''}
			],
			autoLoad: false,
			remoteSort: false,
			pageSize: 1,
			proxy: {
				url: '/admins.json',
				type: 'ajax',
				reader: {
					type: 'json',
					root: 'records'
				},
				simpleSortMode: true
			},
			listeners: {
				beforeLoad: function(store){
					store.removeAll(false);
				}
			}
		});
		return me.store;
	},
	// 创建底部工具栏
	createBbar: function(store){
		var bbar = Ext.create('Ext.toolbar.Paging',{
			store: store,
			displayInfo: true
		});
		return bbar;
	},
	//创建顶部工具栏
	createTbar: function(store){
		var tbar = Ext.create('Ext.toolbar.Toolbar',{
			items: [,"->",
			Ext.create('Ext.ux.form.SearchField',{
				fieldLabel: '搜索',
				labelWidth: 35,
				width: 200,
				margin: '0 5 0 0',
				store: store,
				searchURL:'/admins/search.json'
			})]
		});
		return tbar;
	}
});