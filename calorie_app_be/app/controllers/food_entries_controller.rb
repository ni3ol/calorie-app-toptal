class FoodEntriesController < ApplicationController
  skip_before_action :verify_authenticity_token, except: [:index]
  before_action :authenticate, except: [:create, :update, :destroy]

  def index
    render json: {
      food_entries: food_entries
    }
  end

  def create
    FoodEntry.create!(food_entry_params)

    render json: { message: 'success' }
  end

  def update
    food_entry.update!(food_entry_params)

    render json: { message: 'success' }
  end

  def destroy
    food_entry.destroy!

    render json: { message: 'Food entry deleted' }
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

  def food_entry_params
    params.require(:params).permit(:name, :user_id, :consumed_at, :calories, :price)
  end

  def food_entry
    FoodEntry.where(id: params[:id]).first
  end

  def food_entries
    food_entry = user.is_admin ? FoodEntry.all : FoodEntry.where(user_id: user.id)

    food_entry.order('updated_at DESC').map do |item|
      {
        id: item.id,
        userId: item.user_id,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
        name: item.name,
        consumedAt: item.consumed_at,
        calories: item.calories,
        price: item.price
      }
    end
  end
end
