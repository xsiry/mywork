class FinanceWith < ActiveRecord::Base
  include Sencha::Model

  attr_accessible :customer, :login, :mode, :quota, :margin, :current_receivable,
                  :current_paid, :current_init_capital, :status, :comment

  sencha_fieldset :grid, [:customer, :login, :mode, :quota, :margin, :current_receivable,
                          :current_paid, :current_init_capital, :status, :comment]                  

end
