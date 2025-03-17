class AddUserIdToMeals < ActiveRecord::Migration[8.0]
  def change
    add_column :meals, :u_id, :integer
  end
end
