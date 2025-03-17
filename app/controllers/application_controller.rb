class ApplicationController < ActionController::API
    def authenticate_user
        token = request.headers['Authorization']&.split(' ')&.last
        if token.present?
            begin
                decoded_token = JWT.decode(token, Rails.application.secret_key_base, true, { algorithm: 'HS256' })
                puts "token"
                u_id = decoded_token[0]['u_id']
                @current_user = User.find(u_id)
            rescue JWT::DecodeError
                render json: {errors: "Invalid token"}, status: :unauthorized
            end
        else
            render json: { errors: "Missing token" }, status: :unauthorized
        end
    end
end
