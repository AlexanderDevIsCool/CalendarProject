class AddAuditoriumToDays < ActiveRecord::Migration[5.2]
  def change
    add_column :days, :auditorium, :string
  end
end
