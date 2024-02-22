class ContactSerializer
  include JSONAPI::Serializer
  attributes :id, :email, :phone, :address, :customer_id

  attributes :name do |obj|
  	obj.customer.name
  end
end
