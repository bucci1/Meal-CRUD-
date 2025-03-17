class User < ApplicationRecord
include BCrypt
has_many :meals
    has_secure_password
    validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }

    def password=(new_password)
        if new_password.present?
          self.password_digest = BCrypt::Password.create(new_password)
        end
    end

   def authenticate(given_password)
    puts "given_password"
    BCrypt::Password.new(password_digest) == given_password
   end
   
end
