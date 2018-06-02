Rails.application.routes.draw do
  resources :calendars
  resources :subjects
  resources :teachers

  root 'calendars#index'
end
