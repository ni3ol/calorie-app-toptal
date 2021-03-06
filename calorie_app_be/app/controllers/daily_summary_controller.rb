class DailySummaryController < ApplicationController
  before_action :authenticate

  def index
    render json: {
      daily_calorie_limit: user.daily_calorie_limit,
      daily_calorie_amount_per_day: daily_calorie_amount_per_day
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

  def start_of_month
    Time.now.beginning_of_month
  end

  def end_of_month
    Time.now.end_of_month
  end

  def daily_calorie_amount_per_day
    grouped_food_entries = food_entries.all.order('consumed_at DESC').group_by { |u| u.consumed_at.beginning_of_day }

    grouped_food_entries.each do |key, entries|
      calories = entries.map(&:calories).reduce(:+)
      grouped_food_entries[key] = calories
    end
  end

  def food_entries
    FoodEntry.where(user_id: params[:user_id])
  end
end
