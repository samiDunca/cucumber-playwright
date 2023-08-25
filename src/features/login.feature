Feature: User Authentication tests

  Background: 
    Given User navigates to the application

  Scenario: Login should be success
    And User enter the username 
    And User enter the password 
    When User click on the signIn button
    Then Login should be success
    
    # And the User clicks on the arrow button
    # And the User clicks on the logout button
    # And the User clicks on the logout confirm button
    # Then the user should be logged out

  Scenario: Login should not be success
    # And User enter the username 
    # And User enter the password 
    # When User click on the signIn button
    # But Login should fail
    # 