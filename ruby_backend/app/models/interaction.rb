class Interaction < ApplicationRecord
  belongs_to :customer

  validates :date, presence: true, uniqueness: true
  validates :status, :interaction_type, presence: true

  enum :status, [ :draft, :active, :inactive ]
  enum :interaction_type, [:meeting, :call]
end
