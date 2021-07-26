class UsersController < ApplicationController
  def index
    render json: {
      user: user
    }
  end

  private

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
