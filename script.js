// Configuration
const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const SEATS_PER_ROW = 12;

// Pre-occupied seats (matching the image)
const OCCUPIED_SEATS = [
  'A1', 'A8',
  'B8', 'B12',
  'C2', 'C3', 'C4', 'C11',
  'D1', 'D11',
  'E3', 'E5', 'E6', 'E8',
  'F2', 'F3', 'F4', 'F5', 'F8', 'F9',
  'G3', 'G4', 'G8',
  'H6', 'H8'
];

// State
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
      if (OCCUPIED_SEATS.includes(seatId)) {
        seatElement.classList.add('occupied');
      }

      // Add click event
      seatElement.addEventListener('click', handleSeatClick);

      seatsContainer.appendChild(seatElement);
    }
  });
}

// Handle seat click
function handleSeatClick(event) {
  const seatElement = event.target;
  const seatId = seatElement.dataset.seat;

  // Don't allow selecting occupied seats
  if (seatElement.classList.contains('occupied')) {
    return;
  }

  // Toggle selection
  if (seatElement.classList.contains('selected')) {
    seatElement.classList.remove('selected');
    selectedSeats = selectedSeats.filter(seat => seat !== seatId);
  } else {
    seatElement.classList.add('selected');
    selectedSeats.push(seatId);
  }

  // Update form
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

// Handle form submission
function handleFormSubmit(event) {
  event.preventDefault();

  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    seats: selectedSeats
  };

  console.log('Booking Details:', formData);

  alert(`Booking Confirmed!\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nSeats: ${formData.seats.join(', ')}\n\nTotal Seats: ${formData.seats.length}`);

  // Reset form and seats
  document.getElementById('bookingForm').reset();

  // Remove selected class from seats
  selectedSeats.forEach(seatId => {
    const seatElement = document.querySelector(`[data-seat="${seatId}"]`);
    seatElement.classList.remove('selected');
    seatElement.classList.add('occupied');
  });

  // Update occupied seats array
  OCCUPIED_SEATS.push(...selectedSeats);

  // Clear selected seats
  selectedSeats = [];
  updateSelectedSeatsDisplay();
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  initializeSeats();

  const bookingForm = document.getElementById('bookingForm');
  bookingForm.addEventListener('submit', handleFormSubmit);
});
