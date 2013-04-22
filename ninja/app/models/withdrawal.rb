class Withdrawal < ActiveRecord::Base
  include Sencha::Model
  # attr_accessible :title, :body
  attr_accessible :login, :bank, :bank_account, :status, :updated_at
                 
  sencha_fieldset :grid, [:login, 
                          :bank, 
                          :bank_account, 
                          :status, 
                          :updated_at]
  scope :order_by,    lambda { |fields,dir| order("#{fields} #{dir}")}
end
