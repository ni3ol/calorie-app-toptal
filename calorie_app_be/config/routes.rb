Rails.application.routes.draw do
  resources :food_entries, only: [:index]
end
