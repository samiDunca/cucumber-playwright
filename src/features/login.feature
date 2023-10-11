Feature: User Authentication tests

  Background: 
    Given User navigates to the application

  Scenario: Verify that the login works
    And User enters the username 
    And User enters the password 
    When User clicks on the signIn button
    Then Login should be success

  Scenario: Verify that the logout works
    And User logs in
    And user press on Down Arrow button
    And user clicks on Logout button
    And user clicks on confirmation Logout button
    Then user is loged out
    
   