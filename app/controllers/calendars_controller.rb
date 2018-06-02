class CalendarsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: %i[create destroy]
  # GET /calendars
  # GET /calendars.json
  def index
    @calendar = Calendar.find_by(date: Date.today.to_s)
    @teachers = Teacher.all
    @subjects = Subject.all
    unless @calendar.nil?
      @day = Day.find_by(id: calendar.id)
      Day.joins(:teachers, :subject).where("teachers.id = #{day.teachers_id} &&
                                           subjects.id = #{day.subjects_id}")
    end
  end

  # GET /calendars/1
  # GET /calendars/1.json
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
    @day = Day.new(calendar_params)
    @day.save
    @calendar = Calendar.new(@day.id)

    respond_to do |format|
      if @calendar.save
        format.html { redirect_to @calendar, notice: 'Calendar was successfully created.' }
        format.json { render :show, status: :created, location: @calendar }
      else
        format.html { render :new }
        format.json { render json: @calendar.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /calendars/1
  # PATCH/PUT /calendars/1.json
  def update
    respond_to do |format|
      if @calendar.update(calendar_params)
        format.html { redirect_to @calendar, notice: 'Calendar was successfully updated.' }
        format.json { render :show, status: :ok, location: @calendar }
      else
        format.html { render :edit }
        format.json { render json: @calendar.errors, status: :unprocessable_entity }
      end
    end
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

    # Never trust parameters from the scary internet, only allow the white list through.
    def calendar_params
      #params.require(:calendar).permit(:date, teacher_ids: [:teacher], subject_ids: [:subject])
      teachers_params = (params[:day] || [])[:teachers_id]
      params.require(:day).permit(teachers_id: teachers_params)
    end
end
