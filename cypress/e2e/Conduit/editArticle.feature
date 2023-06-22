Feature: Edit Article

    Scenario: Edit description for created article
        Given The system has an article
        When Open editor page for the article and edit description
        And Click on publish article
        Then Article should be edited