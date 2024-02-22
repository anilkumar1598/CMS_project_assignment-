class Customer < ApplicationRecord
	has_many :contacts, dependent: :destroy
	has_many :interactions, dependent: :destroy
	
	validates :name, :email, :mobile_number, :age, presence: true
	validates :email, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i }
	validates :mobile_number, numericality: true, length: {in: 10..13}
	validates :email, uniqueness: {case_sensitive: false}
	validates :mobile_number, uniqueness: true
	validates :age, numericality: { greater_than: 6, less_than_or_equal_to: 100,  only_integer: true }
end
