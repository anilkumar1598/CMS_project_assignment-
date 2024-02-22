# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
User.create(email: "admin@yopmail.com", password: "Test@1234") unless User.find_by_email("admin@yopmail.com")
Customer.find_or_create_by(email: "abc@yopmail.com", name: "Abc", mobile_number: "9212345321", age: 25)
