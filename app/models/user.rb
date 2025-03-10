class User < ApplicationRecord
  has_secure_password
  has_many :daily_tasks
  has_many :sessions, dependent: :destroy

  normalizes :email_address, with: ->(e) { e.strip.downcase }
end
