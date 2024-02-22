require 'rails_helper'

RSpec.describe CustomersController, type: :request do
 
  describe 'GET #index' do
    it 'returns a success response' do
      get '/customers',params:{auth: false}
      expect(response).to be_successful
    end
  end

  describe 'GET #show' do
    it 'returns a success response' do
      customer = FactoryBot.create(:customer)
      get "/customers/#{customer.id}",params:{auth: false}
      expect(response).to be_successful
    end
  end

  describe 'POST #create' do
    context 'with valid parameters' do
      it 'creates a new Customer' do
        expect {
          post '/customers', params: { auth: false, customer: { name: 'Test', email: Faker::Internet.unique.email, age: 35, mobile_number: rand(1111199111..99999999999) } }
        }.to change(Customer, :count).by(1)
      end
    end

    context 'with invalid parameters' do
      it 'does not create a new Customer' do
        expect {
          post '/customers', params: { auth: false, customer: { name: nil, email: 'test@example.com', age: 30, mobile_number: '1234567890' } }
        }.to_not change(Customer, :count)
      end
    end
  end

  describe 'PUT #update' do
    context 'with valid parameters' do
      it 'updates the requested customer' do
        customer = FactoryBot.create(:customer)
        put "/customers/#{customer.id}", params: { auth: false, customer: { name: 'Updated Name' } }
        customer.reload
        expect(customer.name).to eq('Updated Name')
      end
    end

    context 'with invalid parameters' do
      it 'does not update the customer' do
        customer = FactoryBot.create(:customer)
        put "/customers/#{customer.id}", params: { auth: false, customer: { name: nil } }
        customer.reload
        expect(customer.name).to eq('test') # Ensure the name remains unchanged
      end
    end
  end

  describe 'DELETE #destroy' do
    it 'destroys the requested customer' do
      customer = FactoryBot.create(:customer)
      expect {
        delete "/customers/#{customer.id}",params:{auth: false}
      }.to change(Customer, :count).by(-1)
    end
  end
end
