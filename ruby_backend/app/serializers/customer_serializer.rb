class CustomerSerializer
  include JSONAPI::Serializer
  attributes :id, :name, :email, :age, :mobile_number
end
