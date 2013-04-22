class CreateWithdrawals < ActiveRecord::Migration
  def change
    create_table :withdrawals do |t|
      t.string  :login                        # 帐号 
      t.string  :bank                         # 开户行
      t.string  :bank_account                 # 银行帐号 
      t.integer :status,       :default => 0  # 状态(默认: 未处理)

      t.timestamps
    end
  end
end

