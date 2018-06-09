class Calendar < ApplicationRecord
  validates :date, presence: true
end
