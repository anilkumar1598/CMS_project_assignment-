class InteractionsController < ApplicationController
  before_action :set_interactions, only: [:show, :update, :destroy]

  def index
    interactions = Interaction.all
    render json: InteractionSerializer.new(interactions).serializable_hash
  end

  def get_status_interaction_types
    render json: {interaction_types: Interaction.interaction_types.keys, statuses: Interaction.statuses.keys}
  end

  def show
    render json: InteractionSerializer.new(@interaction).serializable_hash
  end

  def create
    interaction = Interaction.new(interaction_params)
    if interaction.save
      render json: InteractionSerializer.new(interaction).serializable_hash, status: :created
    else
      render json: {errors: interaction.errors}, status: :unprocessable_entity
    end
  end

  def update
    if @interaction.update(interaction_params)
      render json: InteractionSerializer.new(@interaction).serializable_hash
    else
      render json: {errors: @interaction.errors}, status: :unprocessable_entity
    end
  end

  def destroy
    if @interaction.destroy
      render json: {message: "Interaction deleted successfully"}, status: :ok
    else
      render json: {errors: interaction.errors}, status: :unprocessable_entity
    end
  end

  private

  def set_interactions
    @interaction = Interaction.find(params[:id])
  end

  def interaction_params
    params.require(:interaction).permit(:status, :interaction_type, :date, :status, :customer_id)
  end
end
