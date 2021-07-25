require 'test_helper'

class FoodEntriesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get food_entries_index_url
    assert_response :success
  end

end
