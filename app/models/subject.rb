class Subject < ApplicationRecord
  validates :name, presence: true,
            uniqueness: { case_sensitive: false },
            length: { minumum: 2, maximum: 30 }
end
