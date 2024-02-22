Rails.application.routes.draw do
  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  resources :customers
  resources :contacts
  resources :interactions do 
    get :get_status_interaction_types, on: :collection
  end
  get "up" => "rails/health#show", as: :rails_health_check

end
