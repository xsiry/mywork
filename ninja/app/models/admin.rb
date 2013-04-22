class Admin < ActiveRecord::Base
	include Sencha::Model
	simple_column_search :login,:name,   :match  => :middle 
	sencha_fieldset :grid, [:name, :login, :out_id, :role_id, :comment]
	belongs_to :role
end