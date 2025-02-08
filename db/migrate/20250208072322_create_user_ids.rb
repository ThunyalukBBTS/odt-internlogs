class CreateUserIds < ActiveRecord::Migration[8.0]
  def change
    create_table :user_ids do |t|
      t.date :date
      t.integer :hours
      t.integer :mins
      t.string :detail

      t.timestamps
    end
  end
end
