Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/rails_admin', as: 'rails_admin'
  resources :food_entries, only: [:index]
  resources :admin_food_statistics, only: [:index]
end
