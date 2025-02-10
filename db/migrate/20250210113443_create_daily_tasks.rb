class CreateDailyTasks < ActiveRecord::Migration[8.0]
  def change
    create_table :daily_tasks do |t|
      t.integer :user_id
      t.date :date
      t.integer :hours
      t.integer :mins
      t.string :detail

      t.timestamps
    end
  end
end
