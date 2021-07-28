class UserMonthlySpendController < ApplicationController
  before_action :authenticate

  def index
    render json: {
      user_id: user.id,
      month: month,
      monthly_spend_limit: user.monthly_spend_limit,
      monthly_spend_amount: monthly_spend_amount
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
    User.where(id: params[:user_id]).first
  end

  def month
    Time.now.strftime('%B %Y')
  end

  def monthly_spend_amount
    food_entries = FoodEntry.where(
      'created_at > ? AND created_at < ?',
      Time.now.beginning_of_month,
      Time.now.end_of_month
    ).where(
      user_id: user.id
    )

    food_entries.map { |food_entry| food_entry.price || 0 }.reduce(:+)
  end
end
