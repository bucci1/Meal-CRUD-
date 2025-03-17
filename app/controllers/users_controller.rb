require 'jwt'

class UsersController < ApplicationController
    before_action :authenticate_user, only: [:show, :update]

    def register
        if params[:user][:password] != params[:user][:password_confirm]
            return render json: { errors: ["Passwords do not match"] }, status: :unprocessable_entity
        end

        user = User.new(user_param)
        user.password = params[:user][:password]

        if user.save
            render json: {message: "User Created successfully", user: user}, status: :created
        else
            render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def user_param
      params.require(:user).permit(:name, :email)
    end

    def login
        user = User.find_by(email: params[:user][:email])

        puts user
        if user && user.authenticate(params[:user][:password])
            token = JWT.encode({
                u_id: user.id,
                u_email: user.email,
                u_name: user.name,
                u_level: user.level
            }, Rails.application.secret_key_base)
            render json: {message: "Login successful", token: token}, status: :ok
        else
            render json: {errors: "Invalid email or password"}, status: :unauthorized
        end
    end

    def show
        render json: {message: "successed", user: @current_user}
    end

    def update
       if @current_user.update(
            calorie: params[:user][:calorie]
        )
            render json: {message: "Your data updated successfully.", current_user}, status: :ok
       else
            render json: {errors: @current_user.errors.full_message}, status: :unprocessable_entity
       end
    end

end
