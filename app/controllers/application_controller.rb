class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token, only: %i[create destroy update]
end
