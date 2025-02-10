Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
  get "/my_daily_task", to: "tasks#index", as: "my_daily_task"
  get "/odt_member", to: "members#index", as: "odt_member"

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  root "home#index"

  # # Defines the root path route ("/")
  # root "daily_task#index"

  get "/daily_task", to: "daily_task#index", as: "daily_task"
end
