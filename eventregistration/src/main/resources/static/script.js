// Configuration
const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const SEATS_PER_ROW = 12;

// State
let occupiedSeats = []; // will be fetched from backend
let selectedSeats = [];

// Initialize seats
function initializeSeats() {
  ROWS.forEach(row => {
    const rowElement = document.querySelector(`.seat-row[data-row="${row}"]`);
    const seatsContainer = rowElement.querySelector('.seats');

    for (let i = 1; i <= SEATS_PER_ROW; i++) {
      const seatId = `${row}${i}`;
      const seatElement = document.createElement('div');
      seatElement.className = 'seat';
      seatElement.dataset.seat = seatId;
      seatElement.textContent = i;

      // Mark occupied seats
      if (occupiedSeats.includes(seatId)) {
        seatElement.classList.add('occupied');
      }

      seatElement.addEventListener('click', handleSeatClick);
      seatsContainer.appendChild(seatElement);
    }
  });
}

// Handle seat click
function handleSeatClick(event) {
  const seatElement = event.target;
  const seatId = seatElement.dataset.seat;

  if (seatElement.classList.contains('occupied')) return;

  if (seatElement.classList.contains('selected')) {
    seatElement.classList.remove('selected');
    selectedSeats = selectedSeats.filter(seat => seat !== seatId);
  } else {
    seatElement.classList.add('selected');
    selectedSeats.push(seatId);
  }

  updateSelectedSeatsDisplay();
}

// Update selected seats display
function updateSelectedSeatsDisplay() {
  const selectedSeatsInput = document.getElementById('selectedSeats');
  const submitBtn = document.getElementById('submitBtn');

  if (selectedSeats.length > 0) {
    selectedSeatsInput.value = selectedSeats.sort().join(', ');
    submitBtn.disabled = false;
  } else {
    selectedSeatsInput.value = '';
    selectedSeatsInput.placeholder = 'No seats selected';
    submitBtn.disabled = true;
  }
}

// Fetch booked seats from backend
async function fetchOccupiedSeats() {
  try {
    const response = await fetch('http://localhost:8081/concerts/tickets');
    const tickets = await response.json();

    // Collect all booked seats from backend
    tickets.forEach(ticket => {
      if (ticket.selectedSeats) {
        ticket.selectedSeats.split(',').forEach(seat => {
          const trimmedSeat = seat.trim();
          if (trimmedSeat && !occupiedSeats.includes(trimmedSeat)) {
            occupiedSeats.push(trimmedSeat);
          }
        });
      }
    });

  } catch (error) {
    console.error('Error fetching occupied seats:', error);
  }
}

// Handle form submission and send to backend
async function handleFormSubmit(event) {
  event.preventDefault();

  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: parseInt(document.getElementById('phone').value),
    selectedSeats: selectedSeats.join(', ')
  };

  try {
    const response = await fetch('http://localhost:8081/concerts/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const text = await response.text();
    alert(text);

    if (response.ok) {
      selectedSeats.forEach(seatId => {
        const seatElement = document.querySelector(`[data-seat="${seatId}"]`);
        seatElement.classList.remove('selected');
        seatElement.classList.add('occupied');
        occupiedSeats.push(seatId);
      });

      document.getElementById('bookingForm').reset();
      selectedSeats = [];
      updateSelectedSeatsDisplay();
    }

  } catch (error) {
    console.error('Error booking seats:', error);
    alert('Booking failed. Please try again.');
  }
}

// Initialize application
document.addEventListener('DOMContentLoaded', async () => {
  await fetchOccupiedSeats(); // fetch booked seats first
  initializeSeats();

  document.getElementById('bookingForm')
          .addEventListener('submit', handleFormSubmit);
});
