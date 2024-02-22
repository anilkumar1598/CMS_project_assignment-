require 'rails_helper'

RSpec.describe Interaction, type: :model do
  describe "validations" do
    it { should validate_presence_of(:date) }
    it { should validate_presence_of(:status) }
    it { should validate_presence_of(:interaction_type) }

    it { should define_enum_for(:status).with_values([:draft, :active, :inactive]) }
    it { should define_enum_for(:interaction_type).with_values([:meeting, :call]) }
  end

  describe "associations" do
    it { should belong_to(:customer) }
  end
end