Rails.application.routes.draw do
  resources :timetables
  resources :calendars
  resources :subjects
  resources :teachers
  resources :day

  get 'ajax_for_index', to: 'calendars#ajax_for_index'
  get 'ajax_for_day', to: 'calendars#ajax_for_day'
  post 'timetable_create', to: 'day#timetable_create'
  patch 'timetable_edit', to: 'day#timetable_edit'

  root 'calendars#index'
end
