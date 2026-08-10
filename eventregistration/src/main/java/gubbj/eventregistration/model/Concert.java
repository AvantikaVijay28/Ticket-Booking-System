package gubbj.eventregistration.model;

public class Concert {
    private String name;
    private String email;
    private int phone;
    private String selectedSeats;

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public int getPhone() { return phone; }
    public void setPhone(int phone) { this.phone = phone; }

    public String getSelectedSeats() { return selectedSeats; }
    public void setSelectedSeats(String selectedSeats) { this.selectedSeats = selectedSeats; }
}
