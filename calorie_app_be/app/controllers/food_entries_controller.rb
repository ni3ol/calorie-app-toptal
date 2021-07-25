class FoodEntriesController < ApplicationController
  def index
    render json: {
      food_entries: food_entries
    }
  end

  def create
    Food.create!(
      user_id: params[:user_id],
      name: params[:name],
      consumed_at: params[:consumed_at],
      calories: params[:calories],
      price: params[:price]
    )

    render json: { message: 'success' }
  end

  private

  def food_entries
    # FoodEntry.create!(user_id: 1, name: 'Banana', consumed_at: Time.now - 1.day - 1.hour, calories: 200, price: 50)
    # FoodEntry.create!(user_id: 1, name: 'Bread', consumed_at: Time.now - 1.day, calories: 100, price: 200)
    # FoodEntry.create!(user_id: 1, name: 'Cake', consumed_at: Time.now - 1.hour, calories: 50, price: 400)
    # FoodEntry.create!(user_id: 2, name: 'Apple', consumed_at: Time.now, calories: 160, price: 20)
    food_entry = params[:user_id] ? FoodEntry.where(user_id: params[:user_id]) : FoodEntry.all

    food_entry.map do |item|
      {
        id: item.id,
        user_id: item.user_id,
        createdAt: item.created_at,
        name: item.name,
        consumedAt: item.consumed_at,
        calories: item.calories,
        price: item.price
      }
    end
  end
end
