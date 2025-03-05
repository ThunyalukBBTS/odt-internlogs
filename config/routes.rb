  Rails.application.routes.draw do
    resource :session
    resources :passwords, param: :token
    # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

    # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
    # Can be used by load balancers and uptime monitors to verify that the app is live.
    get "up" => "rails/health#show", as: :rails_health_check
    get "/my_daily_task", to: "tasks#index", as: "my_daily_task"
    get "/odt_member", to: "member#index", as: "odt_member"

    # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
    # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
    # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
    root "home#index"
    patch "home/:id", to: "home#update", as: "home_update"
    get "home/:id/edit", to: "home#edit", as: "edit_home"
    resources :home, only: [ :edit, :update ]
    resources :daily_tasks, only: [ :create, :update, :edit ]
    post "/", to: "home#create", as: "home_create_task"
    get "/login", to: "login#index"
    get "/register", to: "register#index"
    resources :member, only: [ :index, :show ]
    # # Defines the root path route ("/")
    # root "daily_task#index"
  end
