class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.integer :daily_calorie_limit
      t.integer :monthly_spend_limit

      t.timestamps
    end
  end
end
