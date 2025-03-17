class CreateMeals < ActiveRecord::Migration[8.0]
  def change
    create_table :meals do |t|
      t.integer :user_id
      t.string :title
      t.date :date
      t.decimal :total_price
      t.integer :total_calorie

      t.timestamps
    end
  end
end
