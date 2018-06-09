class AddTimetablesNameToDays < ActiveRecord::Migration[5.2]
  def change
    add_column :days, :timetables_name, :string
  end
end
