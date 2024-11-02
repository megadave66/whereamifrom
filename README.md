# Where Am I From?

"Where Am I From?" is a website where users can enter places they've lived and the years they spent in each location. The site calculates a weighted average location to show the user's "origin" based on their entered data. It also allows users to share their calculated location on social media.

## Project Structure

The project contains three main files:
- `index.html`: Sets up the structure of the website.
- `script.js`: Contains the JavaScript logic for map rendering, geocoding, and calculating the weighted location.
- `style.css`: Provides basic styling for the page layout.

## File Explanations

### index.html

This file defines the basic structure of the webpage, including:
- **Location Input Form**: Allows the user to enter locations and the years they've lived there. It starts with one input row, and users can add more rows as needed.
- **Map Container**: Displays a world map (using OpenStreetMap and Leaflet.js) that dynamically updates with each location entered.
- **Calculated Location Display**: Shows the average location calculated based on the entered years.
- **Share Button**: A button that enables the user to share their "origin" on social media.

### script.js

This file contains the JavaScript logic for the application:
1. **Map Initialization**: Sets up the map with Leaflet.js centered on the world.
2. **Add Location Input**: Adds a new row to the location form when the "Add Another Place" button is clicked.
3. **Geocode Location**: Calls the OpenStreetMap Nominatim API to convert a place name into latitude and longitude coordinates.
4. **Calculate Weighted Average Location**:
   - Retrieves and stores all locations entered, with each location's weight based on years lived.
   - Uses a weighted average formula to calculate the user's "origin."
   - Adds a marker to the map at the calculated location, labeled "Where you are from."
5. **Social Media Sharing**: Constructs a Twitter sharing link with the calculated location and opens it in a new window. The post text includes the calculated location and a link to the website.

### style.css

This file contains styling for the page layout:
- Basic styling for the input form and map display.
- Responsive styles to ensure the layout is user-friendly on various screen sizes.
- Button and text styling for a consistent, clean look.

## Setup and Usage

1. **Open the Project**: Download the project files and open `index.html` in a browser to view the page.
2. **Enter Locations**: Enter places and years, then click "Add Another Place" to add more rows.
3. **Calculate Location**: The map updates as you input locations, and the average "origin" appears below the map.
4. **Share on Social Media**: Click the "Share on Social Media" button to open a Twitter sharing link with your calculated location.

## Libraries and APIs Used

- **Leaflet.js**: For rendering and interacting with the OpenStreetMap world map.
- **OpenStreetMap Nominatim API**: For geocoding place names into latitude and longitude.
- **html2canvas (optional)**: If adding functionality to take a snapshot of the map for sharing.

## Future Improvements

- **Additional Social Media Integration**: Extend sharing functionality to Facebook, WhatsApp, and Instagram.
- **Enhanced Map Features**: Add more options for map customization and interactivity.
- **Offline Support**: Cache the map tiles for offline viewing, especially helpful for users on slower connections.

---

Enjoy exploring your origins with "Where Am I From?" and sharing it with friends!
