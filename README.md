# Where Am I From?

"Where Am I From?" is a website that calculates and shows your "origin" based on places you've lived and the number of years you've spent at each location. You can then share this result on your preferred social media platform.

## Project Structure

The project contains three main files:
- `index.html`: Sets up the structure of the website.
- `script.js`: Contains the JavaScript logic for map rendering, geocoding, and calculating the weighted location.
- `style.css`: Provides basic styling for the page layout.

## Features

### Location Input and Map Display

1. **Location Input Form**: Users can enter places they've lived and specify the number of years spent there. More rows can be added as needed.

2. **Dynamic Map Update**:
   - The map (using OpenStreetMap and Leaflet.js) displays markers for each location.
   - It automatically zooms to fit all entered locations, adjusting to the lowest zoom level that makes all markers visible.

3. **Weighted Average Calculation and Labeling**:
   - The site calculates the user's "origin" as a weighted average of all entered locations.
   - A red pin appears at this average location, labeled "You are from [CALCULATED LOCATION]" with `[CALCULATED LOCATION]` being the closest identifiable place (e.g., city, town, or ocean) to the calculated coordinates.
   - This place name is retrieved using OpenStreetMap's reverse geocoding API.

4. **Wikipedia Link for Calculated Location**:
   - Below the map, the closest location’s name is displayed along with a link to its Wikipedia page for more information.

### Social Media Sharing

- Users can share their calculated location on a platform of their choice: Twitter, Facebook, WhatsApp, or Instagram.
- Selecting a platform opens a sharing link with the default text: "I am from [CALCULATED LOCATION] based on all the places I have lived in my life. Where are you from? Find out at https://megadave66.github.io/whereamifrom!"
- The calculated location dynamically updates the placeholder `[CALCULATED LOCATION]` in the post text.

## File Explanations

### index.html

The HTML structure includes:
- **Location Input Form**: Contains input fields for the place name and years lived.
- **Map Container**: Displays the dynamic map centered to show all user-entered locations.
- **Calculated Location Display**: Shows the user's "origin" based on their weighted location and includes a Wikipedia link for further exploration.
- **Social Media Share Options**: Provides buttons for sharing on different social media platforms.

### script.js

JavaScript handles:
1. **Map Initialization and Zoom-to-Fit**: Sets up the Leaflet.js map and automatically zooms to include all entered locations.
2. **Geocoding and Reverse Geocoding**: Uses OpenStreetMap’s Nominatim API to:
   - Convert place names to latitude and longitude.
   - Reverse geocode the weighted average coordinates to find the closest identifiable place for labeling.
3. **Calculate Weighted Average**:
   - Calculates a weighted average latitude and longitude based on years lived at each location.
   - Places a red pin labeled "You are from [CALCULATED LOCATION]" at the calculated location.
4. **Social Media Sharing**:
   - Allows users to choose a social media platform to share a dynamically generated post with the calculated location.

### style.css

CSS provides:
- Basic styling for layout and input forms.
- Responsive design to ensure the page is accessible on all screen sizes.
- Specific styling for buttons, text, and the map display.

## Setup and Usage

1. **Open the Project**: Download the files and open `index.html` in a browser.
2. **Enter Locations**: Input places and years in the form, adding new rows if needed.
3. **See the Calculated Location**: The map updates and zooms to fit all locations, showing your "origin" with a red pin.
4. **Explore Further**: Click on the Wikipedia link below the map for more details about your calculated location.
5. **Share on Social Media**: Choose a platform to share your result with default text, including the calculated location.

## Libraries and APIs Used

- **Leaflet.js**: For interactive map functionality.
- **OpenStreetMap Nominatim API**: For geocoding (place name to coordinates) and reverse geocoding (coordinates to nearest place name).
- **html2canvas (optional)**: For creating a snapshot of the map for sharing.

## Future Improvements

- **Offline Support**: Caching the map tiles for offline viewing.
- **Image Sharing**: Adding an option to capture a map snapshot and include it in the social media post.

---

"Where Am I From?" is a fun, interactive tool for discovering and sharing your origin based on lived experiences. Enjoy finding your calculated origin and sharing it with friends!
