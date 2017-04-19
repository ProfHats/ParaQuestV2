# Assignment 1 - ReactJS app.
ParaQuest App

Name: Eoin Moloney, Student 20053732


## Overview.

The App is a browser-based game. It consists of a number of interconnected 'Pages', which the user can navigate between via interacting
with the various Components on screen. Each Page includes a text description of a particular environment, and a list of possible options
that the user can take. Sometimes options are simple text links, sometimes they are buttons. Each page also contains an element that allows
them to go back to the previous state. The user has statistics (Strength, Brains, and Charm), which are used to pass the different tests.
If the user passes a test, their stats may increase, while some circumstances can result in their stats being reduced. The player also has
a second set of statistics, "Menaces", which track harm done to their character (Injury, Stress, and Scandal). Certain circumstances (such
as attempting a test and failing it) can increase Menaces. If a Menace exceeds a certain amount, a penalty will be applied to the player
(such as dying and needing to restart the game).

The Adventures are contained within the API. Adventures have an id, which is used to find them via routing, a text description, a 'previous'
variable(which shows what the previous page was) and several arrays.
These arrays include next(list of the other pages this page can link to), tests(a list of which tests, if any, exist in this page), and statsGain
(describes whether or not the user should gain stats on this page - this is usually used for the pages immediately after successful
Tests). Due to the application's design, each Adventure page must have each of these properties, even if they are not used in that Adventure page.

 The App features:
 
 + Dynamic Routing through parameterised URLs, which are tracked by way of a complex array of interconnected objects
 + Randomisation, carried out by API and used together with stats to determine the outcome of tests. 
 + Rudimentary Inventory system carried out via routing

## Installation requirements.
+ ReactJS v15.4.2
+ Bootstrap 3
+ create-react-app tool

After cloning the app from the repository, one only needs to run it via 'npm start'. No extra steps need to be taken.


## Data Model Design.

![][image1]
(the App's Data Model)

There were some problems with attempting to preserve State across different AdventurePages, and the feature was ultimately dropped. As of now,
State resets when the Page changes, which makes the App's persistence system less-than-satisfactory.

## App Component Design.


![][image2]
(the App's Hierarchy)
## UI Design.

![][image3]
(example screen)
![][image4]
(example of a screen with a Test on it)
![][image5]
(example of the type of screen that results from taking a Test)
![][image6]
(The Inventory Screen)
![][image7]
(The Screen for a single Item)
## Routing.

+ /:advID - routes the player to an AdventureView, with data based on the advID
+ /:advID/inventory - routes the player to their inventory via 'Inventory' view. Placing it after /:advId allows the player to quickly return from the Inventory Screen to their previous state
+ /:advID/inventory/:itemId - routes the player to the description of a particular item, providing them with extra information about it via the 'Item' view

## Extra features

The app also features a random number generator, created in the API via the math.random method. This is used to determine whether or not a user
passed a test, when they take one.
The app features a system that allows the player to inspect their inventory, showing all their current items as well as detailed descriptions of such.
The inventory, like the Stats variable, is held in the root App Component, as that is a parent of all the Components that need to know about such data.
A system to persist changes to State, such as the addition/removal of Weapons and Stats, was planned. This system was never finished due to lack of time, however.

## Independent learning.

+The proper use of browserhistory.push() to programmatically go to a certain route
+The correct use of random() to generate pseudorandom numbers for use with the Tests
+The use of callbacks to pass state between Parent components and Child components (not finished, but studied)

[image1]: https://cloud.githubusercontent.com/assets/8709835/24334558/10f8fd76-1264-11e7-94a2-4451e39799fc.jpg
[image2]: https://cloud.githubusercontent.com/assets/8709835/24334561/149057b8-1264-11e7-8ed9-c7409b7424cb.jpg
[image3]: https://cloud.githubusercontent.com/assets/8709835/24334552/07435c68-1264-11e7-9185-9a40dd262ccc.JPG
[image4]: https://cloud.githubusercontent.com/assets/8709835/24334553/0ae9f8fe-1264-11e7-806f-7316bde08d45.JPG
[image5]: https://cloud.githubusercontent.com/assets/8709835/24334555/0de9b0bc-1264-11e7-80c0-0fb06de8336d.JPG
[image6]: https://cloud.githubusercontent.com/assets/8709835/24334564/1ddb8086-1264-11e7-8619-fc4e110b1a81.JPG
[image7]: https://cloud.githubusercontent.com/assets/8709835/24334563/18633e3c-1264-11e7-8c67-1bb380ad1591.JPG
