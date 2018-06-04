class Day < ApplicationRecord
  has_many :calendars
  has_many :teaches
  has_many :subjects

  validates :subjects_id, presence: true
  validates :teachers_id, presence: true
  validates :calendars_id, presence: true
end
