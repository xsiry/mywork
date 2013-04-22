Ext.define('Ninja.window.NewFinanceWithWindow',{
  extend:'Ext.window.Window',
  title:'增加配资',
  closeAction:'hide',
  resizable:false,
  draggable:true,
  modal:true,
  width:570,
  height:270,
  border:0,
  layout:'fit',
  initComponent:function(){
    this.items = [this.createForms()];
    this.buttons = this.createButtons();
    this.callParent(arguments);
  },

  createForms:function(){
    var me = this;
    me.formPanel = Ext.create('Ext.form.Panel',{
      frame:true,
      border:0,
      items:[
        {
          xtype:'container',
          layout:'hbox',
          margin:'25 5 10 25',
          items:[
            {
              xtype:'textfield',
              name:'finance_with[customer]',
              fieldLabel:'配资人',
              labelWidth:50
            },
            {
              xtype:'textfield',
              name:'finance_with[login]',
              fieldLabel:'帐号',
              labelWidth:30,
              margin:'0 0 0 60'
            },
            {
              xtype:'button',
              text:'选择',
              handler:function(){
                Ext.create('Ninja.window.InvestorsSelectWindow').show();
              }
            }
          ]  
        },
        {
          xtype:'container',
          layout:'hbox',
          margin:'10 5 10 25',
          items:[
            {
              xtype:'textfield',
              name:'finance_with[quota]',
              fieldLabel:'配额',
              labelWidth:37,
              margin:'0 0 0 13'
            },
            {
              xtype:'textfield',
              name:'finance_with[margin]',
              fieldLabel:'风险保证金',
              labelWidth:66,
              margin:'0 0 0 25'
            }
          ]
        },
        {
          xtype:'container',
          layout:'hbox',
          margin:'20 0 0 25',
          items:[
            {
              xtype:'label',
              text:'管理费:',
              width:55
            },
            {
              xtype:'textfield',
              width:60,
              height:18
            },
            {
              xtype:'label',
              text:'  /配额',
              width:32,
              margin:'0 0 0 5'
            },
            {
              xtype:'textfield',
              width:60,
              height:18
            },
            {
              xtype:'combo',
              name:'finance_with[status]',
              fieldLabel:'状态',
              margin:'0 0 0 60',
              labelWidth:33,
              width:197,
              value:0,
              forceSelection:true,
              editable:false,
              displayField:'name',
              valueField:'value',
              store:Ext.create('Ext.data.Store', {
                fields:['name','value'],
                data: [
                  {name:'未出账',value:0},
                  {name:'已出账',value:1}
                ]
              })
            }
          ]
        },
        {
          xtype:'textarea',
          name:'finance_with[comment]',
          fieldLabel:'备注',
          labelWidth:37,
          anchor:'90%',
          margin:'10 0 0 37'
        }
      ]
    });
    return me.formPanel;
  },

  createButtons:function(){
    var me = this;
    var buttons = [
      {
        text:'确定',
        handler:function(){
          form = me.formPanel.getForm();
          if(form.isValid()){
            form.submit({
              url:"/finance_withs.json",
              method:'POST',
              success:me.onSuccess,
              failure:me.onFailure,
              scope:me
            });
          }
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
  },

  onSuccess:function(form, action){
    console.log(action);
  },
  onFailure:function(form, action){
    console.log(action);
  }

});