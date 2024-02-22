FactoryBot.define do
  factory :interaction do
    status { 'draft' }
    interaction_type { 'meeting' }
    date { Time.now}
    customer_id {FactoryBot.create(:customer).id }
  end
end
