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

async function reverseGeocode(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.address.city || data.address.town || data.address.village || data.display_name;
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
    map.fitBounds(locations.map(loc => [loc.lat, loc.lon]));
    const calculatedLocationName = await reverseGeocode(avgLat, avgLon);
    L.marker([avgLat, avgLon], { icon: L.icon({ iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png', iconSize: [38, 95] }) })
      .addTo(map)
      .bindPopup(`You are from ${calculatedLocationName}`).openPopup();
    document.getElementById('calculatedLocation').textContent =
      `Your average location: ${calculatedLocationName}`;
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
  const calculatedLocationText = document.getElementById('calculatedLocation').textContent;
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

document.getElementById('locations').addEventListener('change', calculateWeightedAverage);
