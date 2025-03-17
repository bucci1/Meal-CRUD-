class Meal < ApplicationRecord

    # Set accossiation
    belongs_to :user
    has_many :booked_foods, dependent: :destroy
    has_many :foods, through: :booked_foods

    # Set validators
    validates :title, presence: true, uniqueness: true

    # set hooks
    before_update :update_totals

    private
    def update_totals
        self.total_calorie = foods.sum(:calorie)
        self.total_price = foods.sum(:price)
    end
end
