# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#

# User.all.each do |u| u.destroy! end
# FoodEntry.all.each do |u| u.destroy! end

# Create users
User.create!(name: 'Nicol', email: 'nvojacek@gmail.com', daily_calorie_limit: 2000, monthly_spend_limit: 1000, is_admin: true)
User.create!(name: 'Jason', email: 'jason@gmail.com', daily_calorie_limit: 2500, monthly_spend_limit: 1500)

admin_user_id = User.where(name: 'Nicol').first.id
user_id = User.where(name: 'Jason').first.id

# Create food entries for user 1
FoodEntry.create!(user_id: admin_user_id, name: 'Bagel', consumed_at: Time.now - 2.weeks, calories: 230, price: 50)
FoodEntry.create!(user_id: admin_user_id, name: 'Pizza', consumed_at: Time.now - 2.weeks - 1.day, calories: 310, price: 150)
FoodEntry.create!(user_id: admin_user_id, name: 'Soup', consumed_at: Time.now - 1.week, calories: 200, price: 50)
FoodEntry.create!(user_id: admin_user_id, name: 'Banana', consumed_at: Time.now - 1.week - 1.day, calories: 300, price: 150)
FoodEntry.create!(user_id: admin_user_id, name: 'Bread', consumed_at: Time.now - 1.day, calories: 100, price: 200)
FoodEntry.create!(user_id: admin_user_id, name: 'Cake', consumed_at: Time.now - 1.hour, calories: 50, price: 400)
FoodEntry.create!(user_id: admin_user_id, name: 'Apple', consumed_at: Time.now, calories: 160, price: 20)

# Create food entries for user 2
FoodEntry.create!(user_id: user_id, name: 'Pasta', consumed_at: Time.now - 2.weeks, calories: 10, price: 30)
FoodEntry.create!(user_id: user_id, name: 'Eggs', consumed_at: Time.now - 2.weeks - 1.day, calories: 40, price: 160)
FoodEntry.create!(user_id: user_id, name: 'Lentils', consumed_at: Time.now - 1.week, calories: 220, price: 54)
FoodEntry.create!(user_id: user_id, name: 'Stirfry', consumed_at: Time.now - 1.week - 1.day, calories: 305, price: 140)
FoodEntry.create!(user_id: user_id, name: 'Chocolate', consumed_at: Time.now - 1.day, calories: 430, price: 60)
FoodEntry.create!(user_id: user_id, name: 'Smoothie', consumed_at: Time.now - 1.hour, calories: 65, price: 49)
FoodEntry.create!(user_id: user_id, name: 'Cucumber', consumed_at: Time.now, calories: 169, price: 26)

# Update created_at for previous dates
FoodEntry.where(name: 'Cucumber').first.update!(created_at: Time.now - 10.days)
FoodEntry.where(name: 'Cake').first.update!(created_at: Time.now - 11.days)
FoodEntry.where(name: 'Stirfry').first.update!(created_at: Time.now - 2.days)