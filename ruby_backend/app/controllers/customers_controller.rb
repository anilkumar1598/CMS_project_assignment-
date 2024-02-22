class CustomersController < ApplicationController
  before_action :authenticate_user!, unless: -> { params[:auth] == 'false' }
  before_action :set_customer, only: [:show, :update, :destroy]

  def index
    customers = Customer.all
    render json: CustomerSerializer.new(customers).serializable_hash
  end

  def show
    render json: @customer
  end

  def create
    customer = Customer.new(customer_params)
    if customer.save
      render json: CustomerSerializer.new(customer).serializable_hash
    else
      render json: {errors: customer.errors}, status: :unprocessable_entity
    end
  end

  def update
    if @customer.update(customer_params)
      render json: CustomerSerializer.new(@customer).serializable_hash
    else
      render json: {errors: @customer.errors}, status: :unprocessable_entity
    end
  end

  def destroy
    if @customer.destroy
      render json: {message: "Customer deleted Successfully."}, status: :ok
    else
      render json: {errors: customer.errors}, status: :unprocessable_entity
    end
  end

  private

  def set_customer
    @customer = Customer.find(params[:id])
  end

  def customer_params
    params.require(:customer).permit(:name, :email, :age, :mobile_number)
  end
end
