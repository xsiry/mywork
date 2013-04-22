Ext.define('Ninja.util.SessionStateful', {
  checkSessionAndShow: function(checkSessionUrl){
    var checkSessionUrl = checkSessionUrl || '/users/check_sessions.json';
    Ext.Ajax.request({
      url: '/users/check_session.json',
      method: 'GET',
      scope: this,
      success: function(response){
        var text = response.responseText;
        if(text && text != "") {
          var resp = Ext.JSON.decode(text); 
          if(resp.success){
            this.onSessionOnline(resp); 
          }else{
            this.onSessionOffline(resp);
          }
        }
      }
    });
  },
  onSessionOnline: function(resp){
    this.show();
  },
  
  onSessionOffline: function(resp){
    var win = Ext.create('Ninja.window.LoginDialog', {
      rememberLoginField: true,
      listeners: {
        success: {
          fn: function(){
            this.show();
          },
          scope: this
        }
      }
    });
    win.show();
  },
/*
  checkRole :function(cmp){
    Ext.Ajax.request({
      url: '/investors/profile.json',
      method: 'GET',
      scope: this,
      async:false,
      success: function(response){
        var text = response.responseText;
        if(text && text != "") {
          var resp = Ext.JSON.decode(text); 
          if(resp.success){
            var info,loginName,abbName,contestCategory,lbl,userRole,prefs = {},investorId,phaseId,startedAt;
            if(resp.data){
              info            = resp.data;
              loginName       = info.login;
              abbName         = info.abb_name;
              investorId      = info.id;
              contestCategory = info.contest_category;
              lbl             = '您好, {0} ({1}), 欢迎回来！{2}';
              userRole        = info.user_role;
              prefs           = info.prefs || {};
              phaseId         = info.phase_id;
              startedAt       = info.phase_started_at;
            }
            // 用户登录后，将用户信息保存在
            login.loginName  = loginName;
            login.abbName    = abbName;
            login.investorId = investorId;
            login.role       = userRole;
            login.prefs      = prefs;
            login.phaseId    = phaseId;
            login.startedAt = startedAt;
            if(userRole){
              if(userRole == "root"){
                lbl = '{0}管理员:{1}您已登录系统。{2}';
                contestCategory = "";
              }else if(userRole == "admin"){
                lbl = '{0}柜员:{1}您已登录系统。{2}';
                contestCategory = "";
              }else if(userRole == "investor"){
                if(!Ext.isEmpty(contestCategory,false)){
                  contestCategory = "您目前在" + contestCategory + "中。"
                }else{
                  contestCategory = "您目前没有参赛,请关注我们的报名信息";
                }    
              }
            }

            if(Ext.isEmpty(abbName)){
              abbName = "";
            }

            Ext.Ajax.request({
              url: '/menu.json',
              method: 'GET',
              scope: cmp,
              success: function(response){
                var text = response.responseText,
                  resp = Ext.JSON.decode(text);
                if(resp.success){
                  var records = resp.records,
                    buttons   = [],
                    menus     = [];
                  
                  // 登录成功后判断角色,删除默认菜单
                  cmp.remove("main_toolbar");

                  for(var i = 0; i < records.length; i++){
                    var childreen = records[i].childreen,
                      menusConfig = [];
                    // 没有子菜单的情况下，创建按钮，否则创建菜单
                    if(childreen.length == 0 && !Ext.isEmpty(records[i].name,false)){
                      buttons.push({ 
                        xtype: 'button', 
                        text: records[i].label,
                        handler: Ext.ux.menu.StoreMenu.getHandler(records[i].name.toString()) 
                      });
                    }
                    else if(childreen.length != 0 && Ext.isEmpty(records[i].name,false)){
                      for(var j = 0;j < childreen.length; j++){
                        var name = childreen[j].name,
                          label = childreen[j].label;
                        menusConfig.push({
                          text:label,
                          handler: Ext.ux.menu.StoreMenu.getHandler(name.toString())
                        });
                      }
                      menus.push({ 
                        xtype: 'button', 
                        text: records[i].label, 
                        menu:menusConfig
                      });
                    }
                  }
                  
                  // 添加角色对应的新菜单
                  this.insert(1,this.createMenubar(buttons,menus));

                  var tb        = Ext.getCmp('main_toolbar');
                    loginBtn    = tb.getComponent('menu_login_btn');
                    investorLbl = tb.getComponent('menu_investor_lbl');
                    logoutBtn   = tb.getComponent('menu_logout_btn');

                  if(!Ext.isEmpty(lbl,false)){
                    lbl = Ext.String.format(lbl, abbName,loginName,contestCategory);
                    investorLbl.setText(lbl);
                    loginBtn.hide();
                    investorLbl.show();
                    logoutBtn.show();
                  }
                }
              }
            });

            if(!Ext.isEmpty(lbl,false)){
              lbl = Ext.String.format(lbl, abbName,loginName,contestCategory);
              if(userRole == "investor"){
                Ext.create('Finance.window.NotificationWindow', { html: lbl }).show();  
              }else{
                Ext.defer(function(){
                  Ext.create('Finance.window.NotificationWindow', { html: lbl }).show(); 
                },1000);
              }
            }
            
          }
        }
      }
    });
  }*/
  //
  checkRole :function(cmp){
    Ext.Ajax.request({
              url: '/menu.json',
              method: 'GET',
              scope: cmp,
              success: function(response){
                var text = response.responseText,
                  resp = Ext.JSON.decode(text);
                if(resp.success){
                  var records = resp.records,
                    buttons   = [],
                    menus     = [];
                  
                  // 登录成功后判断角色,删除默认菜单
                  cmp.remove("main_toolbar");

                  for(var i = 0; i < records.length; i++){
                    var childreen = records[i].childreen,
                      menusConfig = [];
                    // 没有子菜单的情况下，创建按钮，否则创建菜单
                    if(childreen.length == 0 && !Ext.isEmpty(records[i].name,false)){
                      buttons.push({ 
                        xtype: 'button', 
                        text: records[i].label,
                        handler: Ext.ux.menu.StoreMenu.getHandler(records[i].name.toString()) 
                      });
                    }
                    else if(childreen.length != 0 && Ext.isEmpty(records[i].name,false)){
                      for(var j = 0;j < childreen.length; j++){
                        var name = childreen[j].name,
                          label = childreen[j].label;
                        
                        menusConfig.push({
                          text:label,
                          handler: Ext.ux.menu.StoreMenu.getHandler(name.toString())
                        });
                      }
                      menus.push({ 
                        xtype: 'button', 
                        text: records[i].label, 
                        menu:menusConfig
                      });
                    }
                  }
                  
                  // 添加角色对应的新菜单
                  this.insert(1,this.createMenubar(buttons,menus));

                  var tb        = Ext.getCmp('main_toolbar'),
                  loginBtn    = tb.getComponent('menu_login_btn'),
                  investorLbl = tb.getComponent('menu_investor_lbl'),
                  logoutBtn   = tb.getComponent('menu_logout_btn');
                }
              }
            });
  }
});


