Ext.define('Ext.ex.data.KeyModel', {
  extend: 'Ext.data.Model',
  alternateClassName: 'Ext.ex.data.KeyRecord',

  keyFields: ['id'],

  
  idgen: {
    isGenerator: true,
    type: 'default',

    generate: function () {
      return me.getKey();
    },

    getRecId: function (rec) {
      return rec.modelName + '-' + rec.internalId;
    }
  },
  
  getKey: function(){
    var me = this,
        i = 0,
        length = me.keyFields.length,
        values = [],
        val;
    for(; i < length; i++) {
      val = me.get(me.keyFields[i])
      values.push(val)
    }   
    return values.join("_");
  }
});