class UsersController < ApplicationController
  before_action :authenticate

  def index
    render json: {
      user: user
    }
  end

  private

  def authenticate
    authenticate_or_request_with_http_token do |token, _options|
      user_token = user.token
      ActiveSupport::SecurityUtils.secure_compare(token, user_token)
    end
  end

  def user
    user = User.where(id: params[:user_id])

    user.map do |data|
      {
        id: data.id,
        name: item.name,
        email: item.email,
      }
    end
  end
end
