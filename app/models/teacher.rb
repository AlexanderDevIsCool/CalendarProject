class Teacher < ApplicationRecord
  validates :surname, presence: true,
            length: { minumum: 2, maximum: 30 }
end
