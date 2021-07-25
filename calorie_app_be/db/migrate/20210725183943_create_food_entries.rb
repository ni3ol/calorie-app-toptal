class CreateFoodEntries < ActiveRecord::Migration[6.0]
  def change
    create_table :food_entries do |t|
      t.string :name
      t.integer :user_id
      t.datetime :consumed_at
      t.integer :calories
      t.integer :price

      t.timestamps
    end
  end
end
