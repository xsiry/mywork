# encoding: utf-8
class WithdrawalsController < ApplicationController
  def index  
  end

  def create2
    withdrawal = Withdrawal.new(:login        => params[:login],
                                :bank         => params[:bank],
                                :bank_account => params[:bank_account])
    if withdrawal.save
      @result = "出金请求提交成功!"
    else
      @result = "出金请求提交失败!"
    end
  end
  

  def get
    withdrawals = get_withdrawals(:page     => params[:page],
                                  :per_page => params[:limit],
                                  :sort     => params[:sort],
                                  :dir      => params[:dir])
    respond_to do |format|
      format.json { render :json => { :success => true,
                                      :total   => withdrawals.total_count,
                                      :records => withdrawals.map{ |withdrawal| withdrawal.to_record(:grid)}
                                     }
                   }
    end
  end

private
  def get_withdrawals(options = {})
    get_list_of_records(Withdrawal, options)
  end
end
