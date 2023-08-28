Feature: Edit Booking Url

Background:
    Given User navigates to the application
    And User logs in

# Scenario: Verify that the admin user can edit Booking Url
#     Given that the user is on the Booking Engine page
#     When the user adds or changes the Url link
#     And the user saves the changes
#     Then the Url should be saved successfully

Scenario: Verify that the admin user can add, edit, and delete a Booking Group
    Given that the user is on the Booking Engine page
    When the user clicks on "+" button in the top-right side above the table
    And the user inserts “name” input
    And the user inserts number for “days in advance”
    And the user selects time
    And the user check the following check-boxes: “Limit Concurrent Bookings”, “Limit Concurrent Hours”, “Limit Daily Play”, “Limit Monthly Play”
    And the user inserts number for “Max Concurrent Bookings”
    And the user inserts number for “Max Concurrently Booked hours”
    And the user inserts number for “Max Hours per Day”
    And the user inserts number for “Max Hours per Month”
    And the user selects booking rate from Rates dropdown 
    And the user clicks the save button for modal
    Then the booking should be successfully created
    When the user clicks on the 3 dots of the newly created booking group
    And the user press on 'edit'
    And the user modifies the “newName” input
    And the user modifies the “days in advance” input
    And the user selects another time
    And the user clicks the 'Save' button
    Then the current booking group should be successfully updated
    When the user clicks on the 3 dots of the current updated booking group
    And the user click on 'delete' button
    And the user clicks on  "continue" on the confirmation modal
    Then the booking group should be successfully deleted