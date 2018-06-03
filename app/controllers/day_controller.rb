class DayController < ApplicationController
  before_action :set_day, only: [:edit, :update, :destroy]

  def new
    @day = Day.new
  end

  def create
    @day = Day.new(day_params)
    if @day.save
      flash[:success] = 'Item saved'
    end
  end

  def edit

  end

  def update

  end

  def destroy
    @day.destroy
  end

  private

  def set_day
    @day = Day.find_by(id: params[:id])
  end

  def day_params
    params.require(:day).permit(:subjects_id, :teachers_id, :calendars_id)
  end
end
