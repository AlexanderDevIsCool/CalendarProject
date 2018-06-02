class RemoveReferenceFromCalendarsToDays < ActiveRecord::Migration[5.2]
  def change
    remove_column :calendars, :day_id
  end
end
