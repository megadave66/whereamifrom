let locations = [];
let markers = []; // To store all markers for easy removal
const map = L.map('map').setView([20, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);

function addLocationInput() {
  const container = document.createElement('div');
  container.className = 'location-input';
  container.innerHTML = `
    <input type="text" placeholder="Place" class="place">
    <input type="number" placeholder="Years" class="years" min="1">
  `;
  document.getElementById('locations').appendChild(container);
}

async function geocodeLocation(place) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.length > 0) {
    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
    };
  }
  return null;
}

async function reverseGeocode(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.address.city || data.address.town || data.address.village || data.display_name;
}

async function calculateWeightedAverage() {
  // Remove all existing markers from the map
  markers.forEach(marker => map.removeLayer(marker));
  markers = []; // Clear the markers array

  locations = [];
  const inputs = document.querySelectorAll('.location-input');
  for (const input of inputs) {
    const place = input.querySelector('.place').value;
    const years = parseFloat(input.querySelector('.years').value);
    if (place && years) {
      const coords = await geocodeLocation(place);
      if (coords) {
        locations.push({ ...coords, years });
        const marker = L.marker([coords.lat, coords.lon]).addTo(map)
          .bindPopup(`${place} - ${years} years`).openPopup();
        markers.push(marker); // Store the new marker
      }
    }
  }

  if (locations.length > 0) {
    const { avgLat, avgLon } = calculateAverageLocation();
    map.fitBounds(locations.map(loc => [loc.lat, loc.lon]));

    // Store only the location name
    const calculatedLocationName = await reverseGeocode(avgLat, avgLon);

    const redIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-red.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });

    const avgMarker = L.marker([avgLat, avgLon], { icon: redIcon })
      .addTo(map)
      .bindPopup(calculatedLocationName).openPopup();
    markers.push(avgMarker); // Store the average location marker

    // Display only the location name in the calculatedLocation element
    document.getElementById('calculatedLocation').textContent = calculatedLocationName;
    document.getElementById('wikiLink').innerHTML = `
      <a href="https://en.wikipedia.org/wiki/${calculatedLocationName}" target="_blank">
        Learn more about ${calculatedLocationName} on Wikipedia
      </a>
    `;
  }
}


function calculateAverageLocation() {
  let totalYears = 0, latSum = 0, lonSum = 0;
  for (const loc of locations) {
    totalYears += loc.years;
    latSum += loc.lat * loc.years;
    lonSum += loc.lon * loc.years;
  }
  const avgLat = latSum / totalYears;
  const avgLon = lonSum / totalYears;
  return { avgLat, avgLon };
}

function shareToSocialMedia(platform) {
  const calculatedLocationText = document.getElementById('calculatedLocation').textContent.trim(); // Ensure this line is correct
  const shareText = `I am from ${calculatedLocationText} based on all the places I have lived in my life. Where are you from? Find out at https://megadave66.github.io/whereamifrom!`;
  let url = '';
  
  if (platform === 'twitter') {
    url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
  } else if (platform === 'facebook') {
    url = `https://www.facebook.com/sharer/sharer.php?u=https://megadave66.github.io/whereamifrom&quote=${encodeURIComponent(shareText)}`;
  } else if (platform === 'whatsapp') {
    url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  } else if (platform === 'instagram') {
    alert('Instagram does not support direct sharing via URL. Please share manually.');
    return;
  }
  window.open(url, '_blank');
}
