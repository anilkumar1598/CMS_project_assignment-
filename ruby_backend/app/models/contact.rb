class Contact < ApplicationRecord
  belongs_to :customer
  validates :email, :phone, :address, presence: true
  validates :email, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i }
  validates :phone, numericality: true, length: {in: 10..13}
  validates :email, uniqueness: {case_sensitive: false}
end
