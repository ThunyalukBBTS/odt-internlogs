class CreateUserworktests < ActiveRecord::Migration[8.0]
  def change
    create_table :userworktests do |t|
      t.date :date
      t.integer :hours
      t.integer :mins
      t.string :detail

      t.timestamps
    end
  end
end
