class Calendar < ApplicationRecord
  validates :date, uniqueness: true
end
