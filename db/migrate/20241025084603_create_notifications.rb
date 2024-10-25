class CreateNotifications < ActiveRecord::Migration[7.2]
  def change
    create_table :notifications do |t|
      t.integer :recipient_id
      t.integer :actor_id
      t.string :action
      t.datetime :read
      t.references :notifiable, polymorphic: true, null: false

      t.timestamps
    end
  end
end
