Feature: Reservation Management

Background:
    Given User navigates to the application
    And User logs in

# Scenario:  Editing the "No-Show" Settings
#     Given that the user is on the reservation page
#     When the user clicks on the "Automatically Mark No-Show" checkbox
#     And the user adjusts the time duration in the checkbox
#     And the user clicks the Save button for page modifications
#     Then the modified data should be saved 

Scenario Outline: Verify that the admin user can add, edit, and delete a Booking Group
    # Adding
    Given that the user is on the reservation page
    Then the user clicks on the "+" button within the "Schedule" section
    When the user fills in the required “Name” input
    And the user selects the calendar Start Date
    And the user clicks on the "Start when course opens" checkbox
    And the user clicks on the "End when course closes" checkbox
    And the user selects the "Start Time"
    And the user selects the "End Time"
    And the user and selects an option from the repeat dropdown
        |   repeatOption         |
        # |   Daily              |
        |   Weekly               |
        # |   None               |
    And the user selects one or multiple week days
        |   dayInitialLetter |
        |   S                |
        |   M                |
        |   T                |
        # |   W                |
        # |   Th               |
        # |   F                |
        # |   Sa               |
    And the user selects the calendar End Date
    And the user clicks the Save button for Schedule Modal
    Then the schedule should be successfully created

    # Given the user clicks on the newly created schedule
    # And the user changes the “Name” input
    # And the user selects the “Start date”
    # And the user clicks on the "Start when course opens" checkbox
    # And the user clicks on the "End when course closes" checkbox
    # And the user and selects "none" from the "repeat" dropdown 
    # And the user changes inputs, dates, and dropdown selections
    # And the user clicks on the "+" button in the "rate override" section
    # And the user insert in the fields: "override Name"
    # And the user insert in the fields: "Amount"
    # And the user selects from the “Rate” dropdown

    # And the user clicks the 'Save' button
    # Then the current schedule should be successfully updated
    # And the user clicks on the newly edited schedule
    # And the user clicks the 'Delete' button
    # And the user confirms deletion by clicking 'Continue' on the confirmation pop-up
    # Then the schedule should be successfully deleted
