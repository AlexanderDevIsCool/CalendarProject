class AddHasDenominatorToDays < ActiveRecord::Migration[5.2]
  def change
    add_column :days, :has_denominator, :boolean, default: false
  end
end
