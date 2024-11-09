class PostsController < ApplicationController
  before_action :authenticate_user!, only: [ :new, :create ]
  before_action :set_post, only: [ :show ]
  def index
    @posts = Post.includes(:user).all.order(created_at: :desc)
  end

  def show; end

  def new
    @post = Post.new
  end

  def create
    @post = Post.create(post_params)
    @post.user = current_user

    if @post.save
      # send notification to other users!
      send_notifications_to_others(@post)
      redirect_to @post, notice: "Post created successfully!"
    else
      render :new, status: :unprocessable_entity
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
