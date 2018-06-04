Rails.application.routes.draw do
  resources :calendars
  resources :subjects
  resources :teachers
  resources :day

  get 'ajax_for_index', to: 'calendars#ajax_for_index'

  root 'calendars#index'
end
