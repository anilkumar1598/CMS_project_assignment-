# spec/models/customer_spec.rb

require 'rails_helper'

RSpec.describe Customer, type: :model do
  describe "validations" do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:mobile_number) }
    it { should validate_presence_of(:age) }

    it { should_not allow_value('test@example').for(:email) }

    it { should validate_uniqueness_of(:email).case_insensitive }

    it { should validate_numericality_of(:age).is_greater_than(6).is_less_than_or_equal_to(100).only_integer }
    it { should validate_length_of(:mobile_number).is_at_least(10).is_at_most(13) }
  end

  describe "associations" do
    it { should have_many(:contacts).dependent(:destroy) }
    it { should have_many(:interactions).dependent(:destroy) }
  end
end