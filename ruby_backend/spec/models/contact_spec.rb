# spec/models/contact_spec.rb

require 'rails_helper'

RSpec.describe Contact, type: :model do
  let(:customer) { FactoryBot.create(:customer) } # Using FactoryBot to create a customer

  it 'is valid with valid attributes' do
    contact = FactoryBot.create(:contact, customer: customer)
    expect(contact).to be_valid
  end

  it 'is not valid without email' do
    contact = FactoryBot.build(:contact, customer: customer, email: nil)
    expect(contact).to_not be_valid
  end

  # Test for uniqueness of email
  it "validates uniqueness of email" do
    existing_contact = FactoryBot.build(:contact, email: "test@example.com")
    new_contact = Contact.new(email: "test@example.com", phone: "8789897899", address: "address", customer_id: 51)
    expect(new_contact).to_not be_valid
  end

  it "validates uniqueness of phone" do
    existing_contact = FactoryBot.create(:contact, phone: "1234567090")
    new_contact = Contact.new(email: "cesar.roberts@nolan.example", phone: "1234567090", address: "address", customer_id: 52)
    expect(new_contact).to_not be_valid
  end
end
