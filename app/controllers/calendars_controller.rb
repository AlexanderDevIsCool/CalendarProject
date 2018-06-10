class CalendarsController < ApplicationController
  def index
    if params[:date]
      date = params[:date]
      @calendar = Calendar.find_by(date: date)
      @day = Day.where(calendars_id: @calendar.id) unless @calendar.nil?
      unless @day.nil?
        @teachers = Teacher.where(id: @day.map(&:teachers_id))
        @subjects = Subject.where(id: @day.map(&:subjects_id))
      end
    end
  end

  def show
    @calendar = Calendar.find_by(id: params[:id])
    @teachers = Teacher.all
    @subjects = Subject.all
  end

  def new
  end

  def edit
    @calendar = Calendar.find_by(id: params[:id])
    @day = Day.where(calendars_id: @calendar.id)
    @teachers = Teacher.all
    @subjects = Subject.all
  end

  def create
    @calendar = Calendar.new(calendars_params)
    if @calendar.save
      redirect_to @calendar
    else
    end
  end

  def update
  end

  def destroy
    Day.where(calendars_id: params[:id]).destroy_all
    Calendar.find_by(id: params[:id]).destroy
    redirect_to calendars_path
  end

  def ajax_for_index
    date = params[:date] ||= Date.today.to_s
    @calendar = Calendar.find_by(date: date, time_table_id: nil)
    @calendar = Calendar.find_by(
        date: date, time_table_id: Timetable.find_by(name: params[:timetable]).id
    ) unless params[:timetable].nil? || params[:timetable] == ''
    @day = Day.where(calendars_id: @calendar.id) unless @calendar.nil?
    unless @day.nil?
      @teachers = Teacher.where(id: @day.map(&:teachers_id))
      @subjects = Subject.where(id: @day.map(&:subjects_id))
    end
    respond_to do |format|
      format.html {redirect_to calendars_path}
      format.json {render :index, status: :created, location: calendars_path}
      format.js
    end
    params[:timetable] = nil
    params[:date] = nil
  end

  def ajax_for_day
    @calendar = Calendar.find_by(id: params[:id])
    @day = Day.where(calendars_id: @calendar.id)
    @teachers = Teacher.all
    @subjects = Subject.all
  end

  private

  def calendars_params
    params.require(:calendar).permit(:date)
  end
end
