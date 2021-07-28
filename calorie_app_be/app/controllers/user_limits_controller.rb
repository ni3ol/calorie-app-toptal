class UserLimitsController < ApplicationController
  before_action :authenticate

  def index
    if user.blank?
      render_not_found
    else
      render json: {
        user_id: user.id,
        daily_calorie_limit: user.daily_calorie_limit,
        monthly_spend_limit: user.monthly_spend_limit
      }
    end
  end

  private

  def authenticate
    authenticate_or_request_with_http_token do |token, _options|
      user_token = user.token
      ActiveSupport::SecurityUtils.secure_compare(token, user_token)
    end
  end

  def render_not_found
    render json: { error: 'User does not exist' }, status: :not_found
  end

  def user
    User.where(id: params[:user_id]).first
  end
end
