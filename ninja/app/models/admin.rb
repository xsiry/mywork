class Admin < ActiveRecord::Base
	include Sencha::Model
	simple_column_search :login, :name,   :match  => :middle 
	sencha_fieldset :grid, [:name, :login, :out_id, :comment, {:role => [:name]} ]
	belongs_to :role
end