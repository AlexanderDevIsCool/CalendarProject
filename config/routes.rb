Rails.application.routes.draw do
  resources :calendars
  resources :subjects
  resources :teachers
  resources :day

  root 'calendars#index'
end
