# encoding: utf-8
class PaymentsController < ApplicationController

  def index
    # payments = get_payments(:page     => params[:page], 
    #                         :per_page => params[:limit])
    # payments = payments.order("created_at DESC")
    # respond_to do |format|
    #   format.json { render :json => { :success => true,
    #                                   :total   => payments.total_count,
    #                                   :records => payments.map{ |payment| payment.to_record(:grid)}
    #                                 }
    #               }
    # end
  end

  def get

    payments = get_payments(:page     => params[:page], 
                            :per_page => params[:limit])
    payments = payments.order("created_at DESC")
    respond_to do |format|
      format.json { render :json => { :success => true,
                                      :total   => payments.total_count,
                                      :records => payments.map{ |payment| payment.to_record(:grid)}
                                    }
                  }
    end
  end

  def search
    
    payments = get_payments(:query    => params[:query],
                            :page     => params[:page],
                            :per_page => params[:limit])
    respond_to do |format|
      format.json { render :json => { :success => true,
                                      :total   => payments.total_count,
                                      :records => payments.map{ |payment| payment.to_record(:grid)}
                                    } 
                  }
    end
  end


private
  def get_payments(options = {})
    get_list_of_records(Payment, options)
  end

end