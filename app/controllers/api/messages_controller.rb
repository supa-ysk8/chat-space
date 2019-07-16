class Api::MessagesController < ApplicationController
  def index
    @group = Group.find(params[:group_id])
    @messages = Message.where("id > ?", params[:id])
  end
end
