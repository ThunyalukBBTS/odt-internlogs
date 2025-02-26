class CreateRegisters < ActiveRecord::Migration[8.0]
  def change
    create_table :registers do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :password_digest
      t.string :bank_name
      t.string :account_name
      t.string :account_number_digest

      t.timestamps
    end
  end
end
