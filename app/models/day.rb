class Day < ApplicationRecord
  has_many :calendars
  has_many :teaches
  has_many :subjects
end
