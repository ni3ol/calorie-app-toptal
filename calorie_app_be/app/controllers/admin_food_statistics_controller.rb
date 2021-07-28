class AdminFoodStatisticsController < ApplicationController
  before_action :authenticate
  USER_TOKEN = 'secret'

  def index
    render json: {
      last_week_date_range: last_week_date_range,
      two_weeks_ago_date_range: two_weeks_ago_date_range,
      current_date: current_date,
      last_week_entries_count: last_week_entries_count,
      two_weeks_ago_entries_count: two_weeks_ago_entries_count,
      current_day_entries_count: current_day_entries_count,
      average_calories_per_day: average_calories_per_day
    }
  end

  private

  def authenticate
    authenticate_or_request_with_http_token do |token, _options|
      ActiveSupport::SecurityUtils.secure_compare(token, USER_TOKEN)
    end
  end

  def last_week_date_range
    start_week = format_date(Time.now - 7.days)
    end_week = format_date(Time.now)

    start_week + ' - ' + end_week
  end

  def two_weeks_ago_date_range
    start_week = format_date(Time.now - 14.days)
    end_week = format_date(Time.now - 7.days)

    start_week + ' - ' + end_week
  end

  def current_date
    format_date(Time.now)
  end

  def format_date(date)
    date.strftime('%e %B %Y')
  end

  def last_week_entries_count
    FoodEntry.where('created_at >= ?', 1.week.ago).count
  end

  def two_weeks_ago_entries_count
    FoodEntry.where(created_at: 2.weeks.ago..1.week.ago).count
  end

  def current_day_entries_count
    FoodEntry.where('created_at >= ?', Time.now.beginning_of_day).count
  end

  def average_calories_per_day
    average_calories_mapping = {}

    (0...7).map do |day|
      date = day.days.ago

      food_entries = FoodEntry.where(consumed_at: date.all_day)
      calories = food_entries.map(&:calories).reduce(:+)

      average_calories = food_entries.count == 0 ? 0 : calories / food_entries.count

      average_calories_mapping[date] = average_calories
    end

    average_calories_mapping
  end
end
