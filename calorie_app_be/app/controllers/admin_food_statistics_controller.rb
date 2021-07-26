class AdminFoodStatisticsController < ApplicationController
  def index
    render json: {
      last_week_entries_count: last_week_entries_count,
      two_weeks_ago_entries_count: two_weeks_ago_entries_count,
      current_day_entries_count: current_day_entries_count,
      last_week_average_calories_per_user_count: last_week_average_calories_per_user_count
    }
  end

  private

  def last_week_entries_count
    FoodEntry.where('created_at >= ?', 1.week.ago).count
  end

  def two_weeks_ago_entries_count
    FoodEntry.where(created_at: 2.weeks.ago..1.week.ago).count
  end

  def current_day_entries_count
    FoodEntry.where('created_at >= ?', 1.day.ago).count
  end

  def last_week_average_calories_per_user_count
    user_to_average_calouries_mapping = {}
    weekly_user_calories = []
    User.all.each do |user|
      foods = FoodEntry.where(user_id: user.id).where('created_at >= ?', 1.week.ago)
      calories = 0
      foods.each do |food|
        calories += food.calories
      end

      seven_day_average = calories / 7
      user_to_average_calouries_mapping[user.id] = seven_day_average
      weekly_user_calories << calories
    end

    weekly_user_calories.reduce(:+) / User.count
  end
end
