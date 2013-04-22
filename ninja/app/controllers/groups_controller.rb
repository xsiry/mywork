# encoding: utf-8
class GroupsController < ApplicationController

  def index
    groups = get_groups(:page => params[:page], :per_page => params[:limit])
    respond_to do |format|
      format.json { render :json => { :success => true,
                                      :total   => groups.total_count,
                                      :records => groups.map{ |group| group.to_record(:grid) }
                                    }
                  }
    end
  end

  def create
    group = Group.new(params[:group])
    if group.save
      respond_to do |format|
        format.json { render :json => {:success => true} }
      end
    end
  end

  def update
    group = Group.where(:id => params[:id]).first
    group.update_attributes(params[:group])
    respond_to do |format|
      format.json { render :json => {:success => true}}
    end
    
  rescue ActiveRecord::RecordNotFound
    respond_to do |format|
      format.json { render :json => { :success => false } }
    end
  end

  def destroy
    group = Group.where(:id => params[:id]).first
    group.destroy
    respond_to do |format|
      format.json { render :json => { :success => true} }
    end

  rescue ActiveRecord::RecordNotFound
    respond_to do |format|
      format.json { render :json => { :success => false } }
    end
  end

  def group_members
    group = Group.where(:id => params[:id]).first
    investors = group.investors.page(params[:page]).per(params[:limit])
    respond_to do |format|
      format.json { render :json => { :success => true,
                                      :total   => investors.total_count,
                                      :records => investors.map{ |investor| investor.to_record(:members_grid) }
                                    }
                  }
    end
  end

  def join_in
    investor_ids = JSON.parse(params[:investor_ids])
    investor_ids.each do |investor_id|
      Membership.create(:group_id => params[:group_id], :investor_id => investor_id)
    end
    respond_to do |format|
      format.json { render :json => { :success => true } }
    end
  end

  def leave
    investor_ids = JSON.parse(params[:investor_ids])
    Membership.where(params[:group_id]).where(:investor_id => investor_ids).delete_all
    respond_to do |format|
      format.json { render :json => { :success => true } }
    end
  end


  private
  def get_groups(options = {})
    get_list_of_records(Group, options)
  end

end