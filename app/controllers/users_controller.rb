require "jwt"

class UsersController < ApplicationController
  before_action :authenticate_user, only: [:show, :update]

  # Register user
  def register
    # Check if passwords match before creating user
    if params[:password] != params[:password_confirm]
      return render json: { errors: "Passwords do not match" }, status: :unprocessable_entity
    end

    user = User.new(user_params)
    user.password = params[:password]

    if user.save
      render json: { message: "User created successfully", user: user }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # Login user
  def login
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      token = generate_jwt(user)
      render json: { message: "Login successful", token: token }, status: :ok
    else
      render json: { errors: "Invalid email or password" }, status: :unauthorized
    end
  end

  # Show current user
  def show
    render json: { message: "success", user: @current_user }
  end

  # Update user info
  def update
    if @current_user.authenticate(params[:oldPassword])
      if params[:password] != params[:password_confirm]
        return render json: { errors: "Passwords do not match" }, status: :unprocessable_entity
      end

      if @current_user.update(user_update_params)
        token = generate_jwt(@current_user)
        render json: { message: "Update successful", token: token }, status: :ok
      else
        render json: { errors: @current_user.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { errors: "Invalid old password" }, status: :unauthorized
    end
  end

  private

  # Strong parameters for user registration
  def user_params
    params.require(:user).permit(:name, :email)
  end

  # Strong parameters for user update (password, name, calorie)
  def user_update_params
    params.permit(:name, :calorie, :password)
  end

  # Generate JWT token
  def generate_jwt(user)
    JWT.encode(
      {
        u_id: user.id,
        u_email: user.email,
        u_name: user.name,
        u_level: user.level,
        calorie: user.calorie,
      },
      Rails.application.secret_key_base
    )
  end
end
