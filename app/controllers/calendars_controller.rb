class CalendarsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: %i[create destroy]
  # GET /calendars
  # GET /calendars.json
  def index
    @calendar = Calendar.find_by(date: Date.today.to_s)
    #@teachers = Teacher.all
   # @subjects = Subject.all
    #unless @calendar.nil?
    #  @day = Day.find_by(id: calendar.id)
    #  Day.joins(:teachers, :subject).where("teachers.id = #{day.teachers_id} &&
    #                                       subjects.id = #{day.subjects_id}")
    #end
  end

  def show
  end

  # GET /calendars/new
  def new
    @calendar = Calendar.new
  end

  # GET /calendars/1/edit
  def edit
  end

  # POST /calendars
  # POST /calendars.json
  def create
    p calendars_params
    @calendar = Calendar.new(calendars_params)
    respond_to do |format|
      if @calendar.save

      else
      end
    end
  end

  # PATCH/PUT /calendars/1
  # PATCH/PUT /calendars/1.json
  def update
  end

  # DELETE /calendars/1
  # DELETE /calendars/1.json
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
