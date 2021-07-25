# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#

# Create users
User.create!(name: 'Nicol', email: 'nvojacek@gmail.com', daily_calorie_limit: 2000, monthly_spend_limit: 1000)
User.create!(name: 'Jason', email: 'jason@gmail.com', daily_calorie_limit: 2500, monthly_spend_limit: 1500)

# Create food entries
FoodEntry.create!(user_id: 1, name: 'Banana', consumed_at: Time.now - 1.day - 1.hour, calories: 200, price: 50)
FoodEntry.create!(user_id: 1, name: 'Bread', consumed_at: Time.now - 1.day, calories: 100, price: 200)
FoodEntry.create!(user_id: 1, name: 'Cake', consumed_at: Time.now - 1.hour, calories: 50, price: 400)
FoodEntry.create!(user_id: 2, name: 'Apple', consumed_at: Time.now, calories: 160, price: 20)