Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/rails_admin', as: 'rails_admin'
  resources :user_limits, only: [:index]
  resources :food_entries, only: [:index, :create, :update]
  resources :admin_food_statistics, only: [:index]
  resources :user_monthly_spend, only: [:index]
end
