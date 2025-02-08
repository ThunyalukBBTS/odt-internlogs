class DailyTask < ApplicationRecord
    validates :date, presence :true
end
