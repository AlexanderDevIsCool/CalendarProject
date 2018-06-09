class TimetablesController < ApplicationController
  before_action :set_timetable, only: [:show, :edit, :update, :destroy]

  def index
    @timetables = Timetable.all
    if params[:term]
      @timetable = Timetable.order(:name).where("name like ?", "%#{params[:term]}%")
      render json: @timetable.map(&:name)
    end
  end

  def show
  end

  def new
    @timetable = Timetable.new
  end

  def edit
  end

  def create
    @timetable = Timetable.new(timetable_params)
    datesByWeekday = (Date.parse(@timetable.from)..Date.parse(@timetable.to)).group_by(&:wday)

    respond_to do |format|
      if @timetable.save
        (1..5).each do |value|
          datesByWeekday[value].flatten.split(' ').join(',').split(',').each do |value1|
            Calendar.create(date: value1, time_table_id: @timetable.id, day_of_week: value)
          end
        end
        format.html {redirect_to @timetable, notice: 'Timetable was successfully created.'}
        format.json {render :show, status: :created, location: @timetable}
      else
        format.html {render :new}
        format.json {render json: @timetable.errors, status: :unprocessable_entity}
      end
    end
  end

  def update
    respond_to do |format|
      if @timetable.update(timetable_params)
        format.html {redirect_to @timetable, notice: 'Timetable was successfully updated.'}
        format.json {render :show, status: :ok, location: @timetable}
      else
        format.html {render :edit}
        format.json {render json: @timetable.errors, status: :unprocessable_entity}
      end
    end
  end

  def destroy
    Day.where(timetables_name: @timetable.name).delete_all
    Calendar.where(time_table_id: @timetable.id).delete_all
    @timetable.destroy
    respond_to do |format|
      format.html {redirect_to timetables_url, notice: 'Timetable was successfully destroyed.'}
      format.json {head :no_content}
    end
  end

  private
  def set_timetable
    @timetable = Timetable.find(params[:id])
  end

  def timetable_params
    params.require(:timetable).permit(:name, :from, :to)
  end

end
