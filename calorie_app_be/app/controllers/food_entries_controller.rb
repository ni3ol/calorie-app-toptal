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
