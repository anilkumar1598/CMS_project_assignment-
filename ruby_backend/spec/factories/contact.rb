FactoryBot.define do
  factory :contact do
    email { Faker::Internet.unique.email }
    phone { rand(1111199111..99999999999) }
    address { "address"}
    customer_id {FactoryBot.create(:customer).id }
  end
end
