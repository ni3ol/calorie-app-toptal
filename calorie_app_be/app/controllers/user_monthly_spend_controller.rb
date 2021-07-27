class UserMonthlySpendController < ApplicationController
  def index
    render json: {
      user_id: user.id,
      month: month,
      monthly_spend_limit: user.monthly_spend_limit,
      monthly_spend_amount: monthly_spend_amount
    }
  end

  private

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
    )

    food_entries.map { |food_entry| food_entry.price || 0 }.reduce(:+)
  end
end
