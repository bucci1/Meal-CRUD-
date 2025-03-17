class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :password_digest
      t.integer :level, default: 3
      t.integer :calorie, default: 2000

      t.timestamps
    end
  end
end
