class AddDayOfWeekToCalendars < ActiveRecord::Migration[5.2]
  def change
    add_column :calendars, :day_of_week, :integer
  end
end
