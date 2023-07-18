Feature: Home Page


    Scenario: Your Feed list contents
        Given Open Home Page
        When Follow account
        And Click on Your Feed list
        Then User posts should be appeared

    Scenario: Global Feed list contents
        Given Open Home Page
        When Click on Global Feed list
        Then Your posts and all post published should be appeared

    Scenario: Popular Tags contents
        Given Open Home Page
        When Check the content of the Popular Tags box
        Then The box should has a set of tags

    Scenario: Article contents on feed list
        Given The system has an article
        And Open Home Page
        When Click on Global Feed list
        Then The article should be on the list
        And The article should has article author, article title and article description

    Scenario: Open article from feed list
        Given The system has an article
        And Open Home Page
        When Click on Global Feed list
        And Click on article
        Then Article page should be opened

    Scenario: Popular Tag list
        Given The system has an article with popular tag
        And Open Home Page
        When Click on popular tag
        Then List of posts for this tag should be appeared that has your post and all posts which has this popular tag

    Scenario: Favourite post
        Given The system has an article
        And Open Home Page
        When Click on Global Feed list
        And Click on favorite button for this article
        Then The number of favorites should be 1
        And The post should be on Favorited Articles list