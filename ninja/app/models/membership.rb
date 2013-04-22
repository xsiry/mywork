class Membership < ActiveRecord::Base
  attr_accessible :group_id, :investor_id
  belongs_to :group
  belongs_to :investor
end
