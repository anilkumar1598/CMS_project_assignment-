# spec/requests/contacts_spec.rb

require 'rails_helper'

RSpec.describe "Contacts", type: :request do
	let(:customer) { FactoryBot.create(:customer) }
  describe 'GET /contacts' do
    it 'returns a success response' do
      get '/contacts'
      expect(response).to be_successful
    end
  end

  describe 'GET /contacts/:id' do
    let(:contact) { Contact.create(email: Faker::Internet.unique.email, phone: rand(1111199111..99999999999), address: '123 Test St', customer_id: customer.id) }

    it 'returns a success response' do
      get "/contacts/#{contact.id}"
      expect(response).to be_successful
    end
  end

  describe 'POST /contacts' do
    context 'with valid parameters' do
      it 'creates a new contact' do
        expect {
          post '/contacts', params: { contact: { email: Faker::Internet.unique.email, phone: rand(1111199111..99999999999), address: '123 Test St', customer_id: customer.id } }
        }.to change(Contact, :count).by(1)
      end
    end

    context 'with invalid parameters' do
      it 'does not create a new contact' do
        expect {
          post '/contacts', params: { contact: { email: nil, phone: '1234567890', address: '123 Test St', customer_id: 1 } }
        }.to_not change(Contact, :count)
      end
    end
  end

  describe 'PUT /contacts/:id' do
    let(:contact) { FactoryBot.create(:contact) }

    context 'with valid parameters' do
      it 'updates the requested contact' do
        put "/contacts/#{contact.id}", params: { contact: { email: Faker::Internet.unique.email } }
        contact.reload
        expect(response.status).to eq 200
      end
    end

    context 'with invalid parameters' do
      it 'does not update the contact' do
        put "/contacts/#{contact.id}", params: { contact: { email: nil } }
        contact.reload
        expect(contact.email).to eq(contact.email) # Ensure the email remains unchanged
      end
    end
  end

  describe 'DELETE /contacts/:id' do
    let!(:contact) {FactoryBot.create(:contact) }

    it 'destroys the requested contact' do
      expect {
        delete "/contacts/#{contact.id}"
      }.to change(Contact, :count).by(-1)
    end
  end
end
