Feature: Modify Golf Club Settings

Scenario: Modify General Settings
  Given the user is logged in
  When the user navigates to the General Settings page
  And the user updates the pre-filled data with:
  And the user clicks on "save"
  Then the changes should be saved successfully

Scenario: Modify Bays Section
  Given the user is logged in
  When the user navigates to the General Settings page
  And the user modifies each field in the Bays Section
  And the user clicks on "save"
  Then the changes should be saved successfully

Scenario: Modify Legal Section
  Given the user is logged in
  When the user navigates to the General Settings page
  And the user clicks in the checkboxes of the Legal section
  And the user modifies the legal inputs
  And the user clicks on "save"
  Then the changes should be saved successfully

  # Examples:
  #   | Field           | New Value           |
  #   | Club Name       | Tiger Golf          |
  #   | Primary Email   | new@example.com     |
  #   | Website         | www.tigergolf.com   |
  #   | Address Line 1  | New Address Line 1  |
  #   | Address Line 2  | New Address Line 2  |
  #   | City            | New City            |
  #   | State           | New State           |
  #   | Zip             | 12345               |