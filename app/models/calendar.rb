class Calendar < ApplicationRecord
  validates :date, uniqueness: { case_sensitive: false },
            presence: true
end
