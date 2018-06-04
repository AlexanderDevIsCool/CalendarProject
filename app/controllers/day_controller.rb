class DayController < ApplicationController
  before_action :set_day, only: [:edit, :update, :destroy]

  def new
    @day = Day.new
  end

  def create
    supplies = []
    sub_id = []
    teach_id = []
    cal_id = []

    day_params.each do |key, value|
      value.each do |key2, value2|
        supplies << value2
      end
    end

    arr_lenght = supplies.flatten.length / 3
    ((arr_lenght)..(arr_lenght + arr_lenght-1)).each do |i|
      sub_id << Subject.find_by(name: supplies.flatten[i]).id
    end

    ((arr_lenght * 2)..(arr_lenght * 3 - 1)).each do |i|
      arr = supplies.flatten[i].split(' ')
      teach_id << Teacher.find_by(surname: arr[1]).id
    end

    (0..(arr_lenght-1)).each do |i|
      cal_id << supplies.flatten[i]
      @day = Day.new(subjects_id: sub_id[i], teachers_id: teach_id[i], calendars_id: cal_id[i])
      @day.save
    end
  end

  def edit

  end

  def update
    supplies = []
    sub_id = []
    teach_id = []
    cal_id = []

    day_params.each do |key, value|
      value.each do |key2, value2|
        supplies << value2
      end
    end

    arr_lenght = supplies.flatten.length / 3
    ((arr_lenght)..(arr_lenght + arr_lenght-1)).each do |i|
      sub_id << Subject.find_by(name: supplies.flatten[i]).id
    end

    ((arr_lenght * 2)..(arr_lenght * 3 - 1)).each do |i|
      arr = supplies.flatten[i].split(' ')
      teach_id << Teacher.find_by(surname: arr[1]).id
    end

    (0..(arr_lenght-1)).each do |i|
      cal_id << supplies.flatten[i]
      @day.update(subjects_id: sub_id[i], teachers_id: teach_id[i], calendars_id: cal_id[i])
    end
  end

  def destroy
    @day.destroy
  end

  private

  def set_day
    @day = Day.find_by(id: params[:id])
  end

  def day_params
    #params.require(:day).permit(:subjects_id, :teachers_id, :calendars_id)
    params.require(:day).permit(data_ids: ['0':[], '1':[], '2': []])
  end
end
