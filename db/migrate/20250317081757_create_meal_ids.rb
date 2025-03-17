class CreateMealIds < ActiveRecord::Migration[8.0]
  def change
    create_table :meal_ids do |t|
      t.string :food_id

      t.timestamps
    end
  end
end
