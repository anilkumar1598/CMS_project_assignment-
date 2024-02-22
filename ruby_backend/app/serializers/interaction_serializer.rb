class InteractionSerializer
  include JSONAPI::Serializer
  attributes :id, :status, :interaction_type, :date, :status, :customer_id

  attributes :date do |obj|
  	obj.date.strftime("%d/%m/%Y, %H:%M:%S")
  end

  attributes :name do |obj|
  	obj.customer.name
  end
end
