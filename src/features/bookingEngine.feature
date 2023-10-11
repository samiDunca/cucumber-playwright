Feature: Edit Booking Engine Section

Background:
    Given User navigates to the application
    And User logs in

Scenario: Verify that the admin user can edit Booking Url
    Given that the user is on the Booking Engine page
    When the user adds or changes the Url link
    And the user saves the changes
    Then the Url should be saved successfully

Scenario: Verify that the admin user can add, edit, and delete a Booking Group
    # adding
    Given that the user is on the Booking Engine page
    When the user clicks on the plus button in the top-right side above the table
    And the user inserts in Name input
    And the user inserts number for Days in Advance input
    And the user selects time
    And the user checks the following check-boxes: 
        |   checkbox                   |
        |   Limit Concurrent Bookings  |
        |   Limit Concurrent Hours     |
        |   Limit Daily Play           |
        |   Limit Monthly Play         |
    And the user inserts number for the following inputs: 
        |   input                          |
        |   Max Concurrently Booked hours  |
        |   Max Hours per Day              |
        |   Max Hours per Month            |
        |   Limit Monthly Play             |
    And the user selects Booking Rate from Rates dropdown 
    And the user clicks the save button for modal
    Then the booking should be successfully created
    # editing
    When the user clicks on the three dots button of the newly created booking group
    And the user press on edit button
    And the user modifies the New Name input
    And the user modifies the Days in Advance input
    And the user selects another time
    And the user checks the following check-boxes: 
        |   checkbox                   |
        |   Limit Concurrent Bookings  |
        |   Limit Concurrent Hours     |
        |   Limit Daily Play           |
        |   Limit Monthly Play         |
    And the user clicks the save button for modal after update
    Then the current booking group should be successfully updated
    # deleting
    When the user clicks on the three dots button of the current updated booking group
    And the user click on delete button
    And the user clicks on Continue button on the confirmation modal
    Then the booking group should be successfully deleted

Scenario: Verify that the newly created booking group is displayed in the New Schedule Reservation Modal
    # add new Booking Group
    Given that the user is on the Booking Engine page
    When the user clicks on the plus button in the top-right side above the table
    And the user inserts in Name input
    And the user inserts number for Days in Advance input
    And the user selects time
    And the user checks the following check-boxes:
            |   checkbox                   |
            |   Limit Concurrent Bookings  |
            |   Limit Concurrent Hours     |
            |   Limit Daily Play           |
            |   Limit Monthly Play         |
    And the user inserts number for the following inputs:
            |   input                          |
            |   Max Concurrently Booked hours  |
            |   Max Hours per Day              |
            |   Max Hours per Month            |
            |   Limit Monthly Play             |
    And the user selects Booking Rate from Rates dropdown
    And the user clicks the save button for modal
    Then the booking should be successfully created
    # create Schedule with newly created Booking Group
    Given that the user is on the reservation page
    Then the user clicks on the Plus button within the Schedule section
    When the user fills in the required Name input
    And the user selects the calendar 'Start Date'
    And the user selects the calendar 'End Date'
    And the user clicks on the "Start when course opens" checkbox
    And the user clicks on the "End when course closes" checkbox
    And the user selects the "Start Time"
    And the user selects the "End Time"
    And the user and selects 'None' from the repeat dropdown
    And the user selects one or multiple week days
            |   dayInitialLetter |
            |   S                |
            |   M                |
            |   T                |
            |   W                |
            |   Th               |
            |   F                |
            |   Sa               |
    And the user checks all checkboxes from bays section
    And the user checks the checkbox corresponding to the newly created Booking Group 
    And the user clicks the Save button for Schedule Modal
    Then the schedule is successfully created
