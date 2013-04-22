class Role < ActiveRecord::Base

  attr_accessible :name, 
                  :label, 
                  :description,
                  :built_in,
                  :permission
                  
  include Sencha::Model
  has_one   :admin
  has_one   :user
  has_and_belongs_to_many :menus

  def display
    self.label || self.name
  end

  def self.root
    Role.where(:name => "root").first
  end

  def self.admin
    Role.where(:name => "admin").first
  end
end
