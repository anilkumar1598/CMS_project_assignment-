class CreateInteractions < ActiveRecord::Migration[7.1]
  def change
    create_table :interactions do |t|
      t.references :customer, null: false, foreign_key: true
      t.integer :interaction_type
      t.integer :status
      t.datetime :date

      t.timestamps
    end
  end
end
