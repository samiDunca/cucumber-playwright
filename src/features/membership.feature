Feature: Membership Management

Background:
    Given User navigates to the application
    And User logs in

Scenario: Verify that the user can create a Membership Plan
    Given that the user is on the Memberships page
    When the user clicks on the plus button for new Membership Plan
    And the user inserts name in Membership Name input
    And the user selects a Booking Group from member dropdown
    And the user clicks the save button for Membership Plan modal
    Then the membership should be created

Scenario: Verify that the following flow works: create a booking group,
create a Membership Plan assigning the booking group created on the previous step,
and then create a reservation assigning the membership created on the second step.
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

    # add new Membership Plan
    Given that the user is on the Memberships page
    When the user clicks on the plus button for new Membership Plan
    And the user inserts name in Membership Name input
    And the user selects the newly created Booking Group from the dropdown
    And the user clicks the save button for Membership Plan modal
    Then the membership should be created

    #add new Reservation
    Given that the user is on the First page
    When the user click on calendar icon
    And the user selects a date one month appart from current date
    And the user selects a random slot by given Column and Random Time
    Then the user is let to continue based on the slot availability
    When the user selects reservation type
    And the user clicks on 'Create New Customer' Reservation button
    And the user inserts in 'First Name' customer input
    And the user inserts in 'Last Name' customer input
    And the user inserts in 'Email' customer input
    And the user inserts in 'Phone' customer input
    And the user clicks on 'Save Customer' Reservation button
    And the user selects the duration
    And the user clicks on 'Save' Reservation button
    Then a confirmation message is displayed

    # editing Reservations membership data
    When the user clicks on the newly edited reservation
    When the user clicks on 'Membership' tab button
    And the user clicks on 'Add a Membership' Reservation button
    And the user selects a membership plan from dropdown
    And the user clicks on 'Save' Reservation button
    Then the Current Membership is displayed in the Membership History table
    When the user clicks on Tree Dots button
    And the user clicks on 'Edit Membership' Reservation button
    And the user selects the newly created Membership Plan from dropdown
    And the user clicks on 'Save' Reservation button
    Then the Current Membership is displayed in the Membership History table

    # delete membership data
    When the user clicks on Tree Dots button
    And the user clicks on 'Deactivate Membership'  
    And the user clicks on 'Deactivate Membership'
    Then the membership is deactivated

    # deleting the reservation
    When the user clicks on 'Current Reservation' tab button
    And the user click on the trash icon
    And the user clicks on 'Delete' Reservation button
    Then the reservation disappears from table

