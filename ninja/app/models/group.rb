class Group < ActiveRecord::Base
  include Sencha::Model
  attr_accessible :name, :notification_nums, :service_num, :admin_id
  sencha_fieldset :grid, [:id, :name, :notification_nums, :service_num]
  has_many :memberships
  has_many :investors, :through => :memberships
end
