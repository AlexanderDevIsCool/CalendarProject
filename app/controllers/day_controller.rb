class DayController < ApplicationController
  def new
    @day = Day.new
  end

  def create

  end

  def edit

  end

  def update

  end

  def destroy

  end

  private

  def day_params
    params.require(:day).permit(:subjects_id, :teachers_id, :calendars_id)
  end
end
