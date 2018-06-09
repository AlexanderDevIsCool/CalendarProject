class AddTimeTableIdToCalendars < ActiveRecord::Migration[5.2]
  def change
    add_column :calendars, :time_table_id, :integer
  end
end
