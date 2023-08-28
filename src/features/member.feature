Feature: Add Member

Background:
    Given User navigates to the application

Scenario: Verify that the admin user can Add Member
    And User enter the username 
    And User enter the password 
    When User click on the signIn button
    Then Login should be success
    When the user clicks on the "Members" page button
    And user clicks on + button
    And user insert personal data
    When the user clicks on "save" button
    Then the member should be created

    And the user clicks on an existing Member
    And the user click on the account tab
    And the user is edited 
    When the user clicks on "save" button
    Then the member should be updated 
    