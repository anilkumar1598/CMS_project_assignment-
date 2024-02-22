FactoryBot.define do
  factory :customer do
    email { Faker::Internet.unique.email }
    mobile_number { rand(1111199111..99999999999) }
    name { "test"}
    age {21 }
  end
end
