class PostsController < ApplicationController
  before_action :authenticate_user!, only: [ :new, :create ]
  before_action :set_post, only: [ :show ]
  def index
    @posts = Post.all.includes(:user).ordered
  end

  def show; end

  def new
    @post = Post.new
  end

  def create
    @post = Post.create(post_params)
    @post.user = current_user
    respond_to do |format|
      if @post.save
        # send notification to other users!
        send_notifications_to_others(@post)
        format.turbo_stream { flash.now[:notice] = "Post created successfully!" }
        format.html { redirect_to @post, notice: "Post created successfully!" }
      else
        format.html { render :new, status: :unprocessable_entity }
      end
    end
  end

  private
  def send_notifications_to_others(post)
    User.where.not(id: current_user.id).find_each do |user|
      notification = Notification.create!(recipient: user, actor: current_user, action: "posted", notifiable: post)
      NotificationBroadcastJob.perform_later(notification) if notification.persisted?
    end
  end
  def post_params
    params.require(:post).permit(:body, images: [])
  end

  def set_post
    @post = Post.find(params[:id])
  end
end
