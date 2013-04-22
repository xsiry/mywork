# encoding: utf-8
class AdminsController < ApplicationController

	def index
		admins = get_admins(:page			=> params[:page],
												:per_page => params[:limit])

		respond_to do |format|
			format.json { render :json => { :success => true,
																			:total	 => admins.total_count,
																			:records => admins.map { |admin| admin.to_record(:grid)}
																			}
									}
		end
	end

	def search	
		admins = get_admins(:query		=> params[:query],
						  					:page 		=> params[:page],
												:per_page => params[:limit])
		respond_to do |format|
			format.json { render :json => { :success => true,
																			:total 	 => admins.total_count,
																			:records => admins.map { |admin| admin.to_record(:grid)}
																		}
									}
		end
	end

	private
		def get_admins(options = {})
			get_list_of_records(Admin, options)
		end
	end