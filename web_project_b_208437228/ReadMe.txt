HTML PAGES:
HomePage-The first page, the user needs to fill in the following information: the radius in which he looks for a parking lot, type of car(Normal, Disable, Electric, Member), and allow access to his location (Geolocation).
    When the user presses the button, the server saves his location and shows it on a map on the next page- Page2-Map.
Page2-Map-The page shows the user's location on a map and displays the available parking lots that are around him (it will be shown in part c of the project).
    The user must choose the parking lot he wants to go to and press its location. Then the user passes to move to the next page- Page4-Leave.
Page4-Leave-The page shows on a map the user's location and the parking lot that was chosen, the address of the parking lot and that distance between the user and the parking lot.
    There is also a button that the user needs to press when he leaves the parking so that  it will update the DB that there is an empty space in the parking lot.
ContactUs- Page that the user can go to by the navbar. The user can fill in his email address and  send a message to the company.

JavaScrips:
map- functions that show the map and the user's position on the map with a marker.
GeoLocation- functions that get the position of the user, check that the inputs are full and there is access for Geo Location.
Both files have functions that do the hamburger when the screen is in mobile size.

CSS- global:
navbar- on the top of the page there is a navbar that the user can pass to contact us page and back to the home page where he can change his radius if he wants.
Using a mobile, the navbar functions are presented in an "hamburger" format.

