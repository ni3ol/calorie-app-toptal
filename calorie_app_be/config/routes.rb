Rails.application.routes.draw do
  resources :food_entries, only: [:index]
  resources :admin_food_statistics, only: [:index]
end
