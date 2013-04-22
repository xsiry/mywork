# encoding: utf-8
class User < ActiveRecord::Base
  attr_accessible :login, :password, :role_id
  belongs_to :role
end
