Feature: Add Customer

Background:
    Given User navigates to the application

Scenario: Verify that the admin user can Add Customer
    When User enter the username 
    And User enter the password 
    When User click on the signIn button
    Then Login should be success
    And the user clicks on the "Members" page button
    And the user clicks on the Customer page button
    And user clicks on + button 
    And user insert personal data for customer
    When the user clicks on "save" button
    Then the customer should be created

    And the user clicks on the newly created customer
    And the customer user is edited with the following data
    When the user clicks on "save" button
    Then the customer should be updated 


