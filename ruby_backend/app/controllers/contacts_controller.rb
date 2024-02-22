class ContactsController < ApplicationController
  before_action :get_contacts, only: [:show, :update, :destroy]

  def index
    contacts = Contact.all
    render json: ContactSerializer.new(contacts).serializable_hash
  end

  def show
    render json: @contact
  end

  def create
    contact = Contact.new(contact_params)
    if contact.save
      render json: ContactSerializer.new(contact).serializable_hash
    else
      render json: {errors: contact.errors}, status: :unprocessable_entity
    end
  end

  def update
    if @contact.update(contact_params)
      render json: ContactSerializer.new(@contact).serializable_hash
    else
      render json: {errors: @contact.errors}, status: :unprocessable_entity
    end
  end

  def destroy
    if @contact.destroy
      render json: {message: "Successfully destroyed contact."}, status: :ok
    else
      render json: {errors: contact.errors}, status: :unprocessable_entity
    end
  end

  private

  def get_contacts
    @contact = Contact.find(params[:id])
  end

  def contact_params
    params.require(:contact).permit(:email, :phone, :address, :customer_id)
  end
end
