class AddReferenceFromDaysToCalendars < ActiveRecord::Migration[5.2]
  def change
    add_reference :days, :calendars, index: true
  end
end
