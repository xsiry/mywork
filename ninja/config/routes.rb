Ninja::Application.routes.draw do
  # The priority is based upon order of creation:
  # first created -> highest priority.
  root :to => 'pivot#index'
  
  match 'home' => 'welcome#index'
  match 'websockets/client' => 'websockets#client', :as => :ws_client

  match 'captcha'    => 'captcha#simple_captcha',   :as => :captcha,  :via => :get
  match 'login'      => 'authentications#create',   :as => :login,    :via => :post
  match 'logout'     => 'authentications#destroy',  :as => :logout,   :via => :delete

  match 'rpc/echo'   => 'rpc#echo',                 :as => :rpc_echo, :via => :get
  match 'rpc/add'    => 'rpc#add',                  :as => :rpc_add,  :via => :get
  match 'test/referer' => 'test#referer'

  match 'investor_login'      => 'investors#create',    :as => :investor_login,   :via => :post
  match 'investor_logout'     => 'investors#destroy',   :as => :investor_logout,  :via => :delete

  match 'tenpay'        => 'tenpay#index',          :as => :tenpay_index,  :via => :get
  # http://localhost:3000/product/pay?login=lk100016&price=1000000&bank=1052
  # http://www.lktz.net:5800/product/pay?login=lk100016&price=10000&bank=1052
  # 
  #match 'product/pay'    => 'chinabank#pay',            :as => :chinabank_pay,    :via => :get
  #match 'product/paid'   => 'chinabank#paid',           :as => :chinabank_paid
  match 'product/notify' => 'chinabank#notify',          :as => :chinabank_notify, :via => :get

  match 'product/pay'    => 'pivot#pay',      :via => :get
  match 'product/pay3'   => 'pivot#pay3',     :via => :get
  match 'product/pay2'   => 'yeepay#cheetah_client_pay', :as => :yeepay_cheetah_client_pay, :via => :get
  match 'product/wpay'   => 'yeepay#pay',                :as => :yeepay_pay,   :via => :get
  match 'product/paid'   => 'yeepay#paid',               :as => :yeepay_paid

  match 'product/online_pay' => 'chinabank#online_pay', :as => :chinabank_online_pay, :via => :get
  #resources :withdrawals
  match 'withdrawals/create2' => 'withdrawals#create2', :as => :withdrawals_create2, :via => :get
  resources :pivot

  resources :sms do
    collection do
      get :outbox
      get :search
    end
  end

  resources :cfmmc do
    collection do
      get :index3
    end
  end

  resources :menu
  resources :withdrawals do
    collection do
      get :get
    end
  end
  
  resources :payments do
    collection do
      get :search
      get :get
    end
  end

  resources :finance_withs

  resources :investors do
    member do
      get  :trades          #
      get  :slaves           #子账户
      get  :group_slave
      get  :positions        #持仓
      get  :orders           #委托
      get  :instrument_ctrls  #可交易合约
    end
    collection do
      get   :show_investors
      get   :filter
      #post  :search
      get   :search
      get   :check_session
    end
  end

  resources :interested_groups do
    resources :investors
  end

  resources :groups do
    member do
      get  :group_members
    end
    collection do
      post  :join_in
      delete   :leave
    end
  end
  
  resources :accounts do
  end

  resources :role do
    collection do
      get   :show_permissions
      post  :add_permissions
      get   :show_menus
      post  :add_menus
      get   :validate
    end
  end

  resources :users do
    collection do
      get   :check_session
    end
  end
  
  resources :instruments do
    collection do
      get  :search
    end
  end

  resources :admins do
    collection do
      get   :search
      get   :get
    end
  end

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
