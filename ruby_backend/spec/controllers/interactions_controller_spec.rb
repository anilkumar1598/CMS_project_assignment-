# spec/requests/contacts_spec.rb

require 'rails_helper'

RSpec.describe "Interactions", type: :request do
  let(:customer) { FactoryBot.create(:customer) }
	let(:interaction) { FactoryBot.create(:interaction) }
  describe 'GET /interaction' do
    it 'returns a success response' do
      get '/interactions'
      expect(response).to be_successful
    end
  end

  describe 'GET /interaction/:id' do
    let(:interaction) { FactoryBot.create(:interaction) }

    it 'returns a success response' do
      get "/interactions/#{interaction.id}"
      expect(response).to be_successful
    end
  end

  describe 'POST /interactions' do
    context 'with valid parameters' do
      it 'creates a new interaction' do
        expect {
          post '/interactions', params: { interaction: { status: "draft", date: Time.now + 1, interaction_type: "meeting", customer_id: customer.id } }
        }.to change(Interaction, :count).by(1)
      end
    end

    context 'with invalid parameters' do
      it 'does not create a new interaction' do
        expect {
          post '/interactions', params: { interaction: { customer_id: 1 } }
        }.to_not change(Interaction, :count)
      end
    end
  end

  describe 'PUT /interactions/:id' do
    let(:interaction) { FactoryBot.create(:interaction) }

    context 'with valid parameters' do
      it 'updates the requested interaction' do
        put "/interactions/#{interaction.id}", params: { interaction: {interaction_type: "call"} }
        interaction.reload
        expect(response.status).to eq 200
      end
    end

    context 'with invalid parameters' do
      it 'does not update the interaction' do
        put "/interactions/#{interaction.id}", params: { interaction: { customer_id: nil } }
        interaction.reload
        expect(response.status).to eq 422 
      end
    end
  end

  describe 'DELETE /interactions/:id' do
    let!(:interaction) {FactoryBot.create(:interaction) }

    it 'destroys the requested interaction' do
      expect {
        delete "/interactions/#{interaction.id}"
      }.to change(Interaction, :count).by(-1)
    end
  end
end
