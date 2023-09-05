Feature: Reservation Management

Background:
    Given User navigates to the application
    And User logs in

Scenario:  Editing the "No-Shows" Settings
    Given that the user is on the reservation page
    When the user clicks on the "Automatically Mark No-Show" checkbox
    And the user adjusts the time duration in the checkbox
    And the user clicks on 'Save' button
    Then the modified data should be saved 


Scenario Outline: Verify that the admin user can add, edit, and delete a Schedule
        # adding
    Given that the user is on the reservation page
    Then the user clicks on the "+" button within the "Schedule" section
    When the user fills in the required “Name” input
    And the user selects the calendar Start Date
    And the user selects the calendar End Date
    And the user clicks on the "Start when course opens" checkbox
    And the user clicks on the "End when course closes" checkbox
    And the user selects the "Start Time"
    And the user selects the "End Time"
    And the user and selects an option from the repeat dropdown
        |   repeatOption         |
        # |   Daily                |
        # |   Weekly               |
        |   None                 |
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
    And the user checks all checkboxes from the Booking Group Section
    And the user clicks the Save button for Schedule Modal
    Then the schedule is successfully created

        # editing
    Given the user clicks on the newly created schedule
    When the user fills in the required “Name” input
    And the user selects the calendar Start Date
    And the user clicks on the "Start when course opens" checkbox
    And the user clicks on the "End when course closes" checkbox
    And the user selects the "Start Time"
    And the user selects the "End Time"
    And the user and selects an option from the repeat dropdown
        |   repeatOption       |
        |   Daily              |
        # |   Weekly             |
        # |   None               |
    And the user selects the calendar End Date
    And the user clicks on the "+" button in the "rate override" section
    And the user inserts the Override Name
    And the user inserts the Override Amount
    And the user selects “Rate” from dropdown
    And the user removes override by name
    And the user clicks on the "+" button in the "rate override" section
    And the user inserts the Override Name
    And the user inserts the Override Amount
    And the user selects “Rate” from dropdown
    And the user clicks the Save button for Schedule Modal
    Then the current schedule is successfully updated

        # deleting
    And the user clicks on the newly edited schedule
    And the user clicks on 'Delete' button
    And the user clicks on 'Continue' button
    Then the schedule is successfully deleted
