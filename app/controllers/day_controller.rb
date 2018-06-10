class DayController < ApplicationController
  before_action :set_day, only: [:edit, :update, :destroy]

  def new
    @day = Day.new
  end

  def create
    supplies = []
    sub_id = []
    teach_id = []
    auditory_id = []
    cal_id = []

    day_params.each do |key, value|
      value.each do |key2, value2|
        supplies << value2
      end
    end

    arr_lenght = supplies.flatten.length / 3
    ((arr_lenght)..(arr_lenght + arr_lenght - 1)).each do |i|
      sub_id << Subject.find_by(name: supplies.flatten[i]).id
    end

    ((arr_lenght * 2)..(arr_lenght * 3 - 1)).each do |i|
      arr = supplies.flatten[i].split(' ')
      teach_id << Teacher.where("surname LIKE ? AND name LIKE ?", "%#{arr[0]}%", "%#{arr[1]}%")[0].id
    end

    ((arr_lenght * 3)..(arr_lenght * 4 - 1)).each do |i|
      arr = supplies.flatten[i].split(' ')
      auditory_id << arr[0]
    end

    (0..(arr_lenght - 1)).each do |i|
      cal_id << supplies.flatten[i]
      @day = Day.new(subjects_id: sub_id[i], teachers_id: teach_id[i],
                     calendars_id: cal_id[i], auditorium: auditory_id[i])
      @day.save
    end
  end

  def edit

  end

  def update
    supplies = []
    sub_id = []
    teach_id = []
    auditory_id = []
    cal_id = []

    p "params #{day_params} "
    day_params.each do |key, value|
      value.each do |key2, value2|
        supplies << value2
      end
    end

    arr_lenght = supplies.flatten.length / 4
    ((arr_lenght)..(arr_lenght + arr_lenght - 1)).each do |i|
      sub_id << Subject.find_by(name: supplies.flatten[i]).id
    end

    ((arr_lenght * 2)..(arr_lenght * 3 - 1)).each do |i|
      arr = supplies.flatten[i].split(' ')
      teach_id << Teacher.find_by(surname: arr[0]).id
    end

    ((arr_lenght * 3)..(arr_lenght * 4 - 1)).each do |i|
      arr = supplies.flatten[i].split(' ')
      auditory_id << arr[0]
    end

    (0..(arr_lenght - 1)).each do |i|
      cal_id << supplies.flatten[i]
      @day.update(subjects_id: sub_id[i], teachers_id: teach_id[i],
                  calendars_id: cal_id[i], auditorium: auditory_id[i])
    end
  end

  def destroy
    @day.destroy
  end

  def timetable_create
    sub = [[], [], [], [], []]
    teach = [[], [], [], [], []]
    auditory = [[], [], [], [], []]
    timetable_id = ""
    day_params.each do |key, value|
      timetable_id = value if value.is_a?(String)
      if value.is_a?(ActionController::Parameters)
        value.each do |key2, value2|
          key2i = 0
          (0..((value2.length / 3) - 1)).each_with_index do
            key2i += 3
            sub[key2.to_i] << value2[-3 + key2i]
            teach[key2.to_i] << value2[-2 + key2i]
            auditory[key2.to_i] << value2[-1 + key2i]
          end
        end
      end
    end

    (1..5).each_with_index do |value, index|
      days = Calendar.where(time_table_id: timetable_id, day_of_week: value)
      days.each_with_index do |day, i|
        if i % 2 == 0
          denominator = false
        else
          denominator = true
        end
        (0..sub[index].length - 1).each do |index1|
          next if denominator && sub[index][index1 + 1].eql?('denominator')
          next if sub[index][index1].eql?('denominator')
          next if denominator == false && sub[index][index1 - 1].eql?('denominator')
          teach_split = teach[index][index1].split(' ')
          Day.create(subjects_id: Subject.find_by(name: sub[index][index1]).id,
                     teachers_id: Teacher.find_by(name: teach_split[1],
                                                  surname: teach_split[0]).id,
                     calendars_id: Calendar.find_by(date: day.date, time_table_id: timetable_id).id,
                     auditorium: auditory[index][index1], timetables_name: timetable_id)
        end
      end
    end

    (0..4).each_with_index do |value|
      (0..sub[value].length - 1).each do |index1|
        next if sub[value][index1].eql?('denominator')
        has_denominator = sub[value][index1 + 1].eql?('denominator')
        teach_split = teach[value][index1].split(' ')
        Day.create(subjects_id: Subject.find_by(name: sub[value][index1]).id,
                   teachers_id: Teacher.find_by(name: teach_split[1],
                                                surname: teach_split[0]).id,
                   calendars_id: (value - 5),
                   auditorium: auditory[value][index1], timetables_name: timetable_id,
                   has_denominator: has_denominator)
      end
    end

    redirect_to calendars_path

  end

  def timetable_edit

    sub = [[], [], [], [], []]
    teach = [[], [], [], [], []]
    auditory = [[], [], [], [], []]
    timetable_id = ""
    day_params.each do |key, value|
      timetable_id = value if value.is_a?(String)
      if value.is_a?(ActionController::Parameters)
        value.each do |key2, value2|
          key2i = 0
          (0..((value2.length / 3) - 1)).each_with_index do
            key2i += 3
            sub[key2.to_i] << value2[-3 + key2i]
            teach[key2.to_i] << value2[-2 + key2i]
            auditory[key2.to_i] << value2[-1 + key2i]
          end
        end
      end
    end

    Day.where(timetables_name: timetable_id).delete_all

    (1..5).each_with_index do |value, index|
      days = Calendar.where(time_table_id: timetable_id, day_of_week: value)
      days.each_with_index do |day, i|
        if i % 2 == 0
          denominator = false
        else
          denominator = true
        end
        (0..sub[index].length - 1).each do |index1|
          next if denominator && sub[index][index1 + 1].eql?('denominator')
          next if sub[index][index1].eql?('denominator')
          next if denominator == false && sub[index][index1 - 1].eql?('denominator')
          teach_split = teach[index][index1].split(' ')
          Day.create(subjects_id: Subject.find_by(name: sub[index][index1]).id,
                     teachers_id: Teacher.find_by(name: teach_split[1],
                                                  surname: teach_split[0]).id,
                     calendars_id: Calendar.find_by(date: day.date, time_table_id: timetable_id).id,
                     auditorium: auditory[index][index1], timetables_name: timetable_id)
        end
      end
    end

    (0..4).each_with_index do |value|
      (0..sub[value].length - 1).each do |index1|
        next if sub[value][index1].eql?('denominator')
        has_denominator = sub[value][index1 + 1].eql?('denominator')
        teach_split = teach[value][index1].split(' ')
        Day.create(subjects_id: Subject.find_by(name: sub[value][index1]).id,
                   teachers_id: Teacher.find_by(name: teach_split[1],
                                                surname: teach_split[0]).id,
                   calendars_id: (value - 5),
                   auditorium: auditory[value][index1], timetables_name: timetable_id,
                   has_denominator: has_denominator)
      end
    end

    redirect_to calendars_path

  end

  private

  def set_day
    @day = Day.find_by(id: params[:id])
  end

  def day_params
    check = params.require(:day).permit(:data_ids)
    if check.empty?
      params.require(:day).permit(:time_table_id, timetable_ids: ['0': [], '1': [],
                                                                  '2': [], '3': [],
                                                                  '4': []])
    else
      params.require(:day).permit(data_ids: ['0': [], '1': [], '2': [], '3': []])
    end
  end
end
