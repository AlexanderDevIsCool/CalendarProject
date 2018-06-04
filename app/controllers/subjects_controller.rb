class SubjectsController < ApplicationController
  before_action :set_subject, only: [:edit, :update, :destroy]

  def index
    @subject = Subject.all
    @subject = Subject.order(:name).where("name like ?", "%#{params[:term]}%")
    render json: @subject.map(&:name)
  end

  def show
  end

  def new
    @subject = Subject.new
  end

  def edit
  end

  def create
    @subject = Subject.new(subject_params)

    respond_to do |format|
      if @subject.save
        format.html { redirect_to subjects_path, notice: 'Subject was successfully created.' }
        format.json { render :index, status: :created, location: @subject }
      else
        format.html { render :index }
        format.json { render json: @subject.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @subject.update(subject_params)
        format.html { redirect_to subjects_path, notice: 'Subject was successfully updated.' }
        format.json { render :index, status: :ok, location: @subject }
      else
        format.html { render :edit }
        format.json { render json: @subject.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @subject.destroy
    respond_to do |format|
      format.html { redirect_to subjects_url, notice: 'Subject was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

    def set_subject
      @subject = Subject.find_by(id: params[:id])
    end

    def subject_params
      params.require(:subject).permit(:name)
    end
end
