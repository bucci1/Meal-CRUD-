class Food < ApplicationRecord
# Validations
  validates :title, presence: true
  validates :price, numericality: { greater_than_or_equal_to: 0 }

  has_many :booked_foods
  has_many :meals, through: :booked_foods
end
