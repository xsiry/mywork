# encoding: utf-8
class UsersController < ApplicationController
  include SimpleCaptcha::ControllerHelpers

  # ------------------------------------------------------------------------------
  def new
    @authentication = Authentication.new
  end

   # ------------------------------------------------------------------------------
  def create
    Authentication.authenticate_with = User
    @authentication = Authentication.new(params[:authentication])
    
    if simple_captcha_valid?
      if @authentication.save
        admin = @authentication.record
        result = { :success          => true,
                   :msg              => '登录成功！',
                   :login            => admin.login,
                   :investor_id      => admin.id
                  }
      else
        result = { :success => false,:msg=> @authentication.errors.messages.values.join }
      end
    else
      result = { :success => false, :msg=> '验证码输入错误'}
    end
    
    respond_to do |format|
      format.json { render :json => result }
    end
  end

  # GET /users
  # GET /users.json                                               AJAX and HTML
  #----------------------------------------------------------------------------
  def index
    users = User.all
    respond_to do |format|
      format.json{ render :json => { :success => true,
                                     :total => users.count,
                                     :records => users.map{|user| user.to_record(:users_grid)}
                                   }
                 }
    end
  end

  # POST /users/add_user
  # POST /users/add_user.json                                     AJAX and HTML
  #----------------------------------------------------------------------------
  def add_user
    user = User.new(params[:user])
    if user.save!(:validate => false)
      respond_to do |format|
        format.json { render :json => {:success => true} }
      end
    end
  end

  # PUT /users
  # PUT /users.json                                               AJAX and HTML
  #----------------------------------------------------------------------------
  def update
    user = User.where(:id => params[:id]).first
    if user.id == 1
      user.update_attributes(params[:user])
      user.login = "root"
    else
      user.update_attributes(params[:user])
    end
    user.save!(:validate => false)
    respond_to do |format|
      format.json { render :json => {:success => true}}
    end
    
  rescue ActiveRecord::RecordNotFound
    respond_to do |format|
      format.json { render :json => { :success => false } }
    end
  end

  # DELETE /users
  # DELETE /users.json                                               AJAX and HTML
  #----------------------------------------------------------------------------
  def destroy
    user = User.where(:id => params[:id]).first
    user.destroy
    respond_to do |format|
      format.json { render :json => { :success => true} }
    end

  rescue ActiveRecord::RecordNotFound
    respond_to do |format|
      format.json { render :json => { :success => false } }
    end
  end

  # 判断当前是否有用户登录
  # users/check_session.json                                           AJAX
  #----------------------------------------------------------------------------
  def check_session
    if current_user
      json_data = {:success => true,
                   :uid   => current_user[:uid], 
                   :login => current_user[:login]}
    else 
      json_data = {:success => false}
    end  
    respond_to do |format|
      format.json { render :json => json_data}
    end
  end

end
