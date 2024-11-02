let locations = [];
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

async function calculateWeightedAverage() {
  locations = [];
  const inputs = document.querySelectorAll('.location-input');
  for (const input of inputs) {
    const place = input.querySelector('.place').value;
    const years = parseFloat(input.querySelector('.years').value);
    if (place && years) {
      const coords = await geocodeLocation(place);
      if (coords) {
        locations.push({ ...coords, years });
        L.marker([coords.lat, coords.lon]).addTo(map)
          .bindPopup(`${place} - ${years} years`).openPopup();
      }
    }
  }
  if (locations.length > 0) {
    const { avgLat, avgLon } = calculateAverageLocation();
    const avgMarker = L.marker([avgLat, avgLon]).addTo(map)
      .bindPopup("Where you are from").openPopup();
    document.getElementById('calculatedLocation').textContent =
      `Your average location: ${avgLat.toFixed(4)}, ${avgLon.toFixed(4)}`;
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

function shareToSocialMedia() {
  const avgLocationText = document.getElementById('calculatedLocation').textContent;
  const shareText = `I am from ${avgLocationText} based on all the places I have lived in my life. Where are you from? Find out at https://megadave66.github.io/whereamifrom!`;
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
  window.open(url, '_blank');
}

document.getElementById('locations').addEventListener('change', calculateWeightedAverage);
