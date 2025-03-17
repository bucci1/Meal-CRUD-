class CreateFoods < ActiveRecord::Migration[8.0]
  def change
    create_table :foods do |t|
      t.string :title
      t.text :desc
      t.decimal :price
      t.integer :calorie

      t.timestamps
    end
  end
end
