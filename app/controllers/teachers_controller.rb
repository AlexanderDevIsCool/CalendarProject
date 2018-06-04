class TeachersController < ApplicationController
  before_action :set_teacher, only: [:show, :edit, :update, :destroy]

  def index
    @teachers = Teacher.all
    @subject = Teacher.all
    @subject = Teacher.order(:surname).where("name like ? OR surname like ?", "%#{params[:term]}%", "%#{params[:term]}%")
    arr1 = []
    @subject.map(&:name).each do |name|
      arr1 << name
    end

    @subject.map(&:surname).each_with_index do |value, index|
      arr1[index] += ' ' + value
    end
    render json: arr1
  end

  def show
  end

  def new
    @teacher = Teacher.new
  end

  def edit
  end

  def create
    @teacher = Teacher.new(teacher_params)

    respond_to do |format|
      if @teacher.save
        format.html { redirect_to teachers_url, notice: 'Teacher was successfully created.' }
        format.json { render :index, status: :created, location: @teacher }
      else
        format.html { render :new }
        format.json { render json: @teacher.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @teacher.update(teacher_params)
        format.html { redirect_to teachers_path, notice: 'Teacher was successfully updated.' }
        format.json { render :index, status: :ok, location: @teacher }
      else
        format.html { render :edit }
        format.json { render json: @teacher.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @teacher.destroy
    respond_to do |format|
      format.html { redirect_to teachers_url, notice: 'Teacher was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

    def set_teacher
      @teacher = Teacher.find(params[:id])
    end


    def teacher_params
      params.require(:teacher).permit(:name, :surname)
    end
end
