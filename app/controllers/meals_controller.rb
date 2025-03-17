class MealsController < ApplicationController
    before_action :authenticate_user
    before_action :set_meal, only: [:show, :destroy, :update]
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

    def index
        meals = Meal.all
        render json: meals
    end

    def create
        @meal = Meal.new(
            user_id: @current_user.id,
            title: params[:meal][:title],
            date: params[:meal][:date],
        )

        total_price = 0
        total_calorie = 0

        food_ids = params[:meal][:foods]

        food_ids.each do |food_id|
            food = Food.find(food_id)
            total_calorie += food.calorie
            total_price += food.price
        end

        
        @meal.total_calorie = total_calorie
        @meal.total_price = total_price


        if @meal.save
            food_ids.each do |food_id|
                BookedFood.create(meal_id: @meal.id, food_id: food_id)
            end

            render json: { message: "Meal booked succssfully", meal: @meal }, status: :created
        else
            render json: { errors: @meal.errors.full_messages }, status: :unprocessable_entity
        end

    end

    def show
        render json: {
            meal: @meal,
            foods: @meal.foods
        }
    end

    def destroy
        if @meal.destroy
            render json: {message: "The meal removed successfully.", meal: @meal}, status: :ok
        else
            render json: {errors: "Can not find the meal"}, status: :unprocessable_entity
        end        
    end

    def update
        BookedFood.where(meal_id: @meal.id).destroy_all

        food_ids = params[:meal][:foods]
        food_ids.each do |food_id|
            BookedFood.create(meal_id: @meal.id, food_id: food_id)
        end

        if @meal.update(
            title: params[:meal][:title],
            date: params[:meal][:date],
        )
        
            render json: @meal
        else
            render json: {errors: @meal.errors.full_message}, status: :unprocessable_entity
        end
    end

    def set_meal
        @meal = Meal.find(params[:id])
        return render json: { error: "Meal not found" }, status: :not_found unless @meal
    end

    def record_not_found
        render json: { error: "Meal not found" }, status: :not_found
    end
end
