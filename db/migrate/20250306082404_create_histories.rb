class CreateHistories < ActiveRecord::Migration[8.0]
  def change
    create_table :histories do |t|
      t.integer :id
      t.date :date
      t.integer :hours
      t.integer :mins
      t.text :detail
      t.datetime :timestamp

      t.timestamps
    end
  end
end
