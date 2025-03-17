class FoodsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    before_action :set_food, only:[:destroy, :show, :update]

    def create
        food = Food.new(food_params)

        if food.save
            render json: {message: "Food created successfully.", food: food}, status: :created
        else 
            render json: {errors: food.errors.full_message} , status: :unprocessable_entity
        end
    end

    def index
        foods = Food.all
        render json: foods
    end

    def show
        render json: @food
    end

    def update
       if @food.update(
       title: params[:food][:title],
        desc: params[:food][:desc],
        price: params[:food][:price],
        calorie: params[:food][:calorie]
       )
        render json: {message: "Food updated successfully", food: @food}, status: :ok
       else
        render json: {errors: @food.errors.full_message}, status: unprocessable_entity
       end
    end

    def destroy
        if @food.destroy
            render json: {message:"Food deleted from the database successfully.", food: @food}, status: :ok
        else
            render json {message:@food.errors.full_message}, status: :unprocessable_entity
        end
    end
    
    def food_params
        params.require(:food).permit(:title, :desc, :price, :calorie)
    end

    def set_food
        @food = Food.find(params[:id])
    end

    def record_not_found
        render json: { error: "Food not found" }, status: :not_found
    end

end
