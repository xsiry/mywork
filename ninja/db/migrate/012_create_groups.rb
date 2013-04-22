class CreateGroups < ActiveRecord::Migration
  def change
    create_table :groups do |t|  # 投资者分组
      t.string :admin_id          # 管理员id
      t.string :name              # 名称
      t.string :notification_nums # 通知号码
      t.string :service_num       # 客服号码

      t.timestamps
    end
    
    add_index   :groups,   :name
  end
end
