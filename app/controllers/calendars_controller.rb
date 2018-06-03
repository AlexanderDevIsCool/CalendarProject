class CalendarsController < ApplicationController
  def index
    date = params[:date] ||= Date.today.to_s
    @calendar = Calendar.find_by(date: date)
    p "NIL ? -> #{@calendar.nil?}"
    @day = Day.find_by(calendars_id: @calendar.id) unless @calendar.nil?
    @teachers = Teacher.all
    @subjects = Subject.all
  end

  def show
  end

  def new
    @calendar = Calendar.new
  end

  def edit
  end

  def create
    p calendars_params
    @calendar = Calendar.new(calendars_params)
      if @calendar.save

      else
      end
  end

  def update
  end

  def destroy
    @calendar.destroy
    respond_to do |format|
      format.html { redirect_to calendars_url, notice: 'Calendar was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

    def calendars_params
      params.require(:calendar).permit(:date)
    end
end
