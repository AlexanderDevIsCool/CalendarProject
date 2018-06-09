class CreateTimetables < ActiveRecord::Migration[5.2]
  def change
    create_table :timetables do |t|
      t.string :name
      t.string :from
      t.string :to

      t.timestamps
    end
  end
end
