class DailyTask < ApplicationRecord
  validates :date, presence: true
  validates :hours, presence: true, numericality: { only_integer: true }
  validates :mins, presence: true, numericality: { only_integer: true }
  validates :detail, presence: false
end
