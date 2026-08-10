package gubbj.eventregistration.dao;

import gubbj.eventregistration.model.Concert;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.*;

@Repository
public class ConcertDAO {

    private static final String URL = "jdbc:mysql://localhost:3306/eventregistration";
    private static final String USER = "root";
    private static final String PASSWORD = "A1n2n3l4y5";

    // ✅ Fetch all tickets
    public List<Concert> getAllTickets() {
        List<Concert> tickets = new ArrayList<>();
        String sql = "SELECT * FROM tickets";

        try (Connection con = DriverManager.getConnection(URL, USER, PASSWORD);
             Statement stmt = con.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            System.out.println("Connected to DB for fetching tickets successfully!");

            while (rs.next()) {
                Concert c = new Concert();
                c.setName(rs.getString("name"));
                c.setEmail(rs.getString("email"));
                c.setPhone(rs.getInt("phone"));
                c.setSelectedSeats(rs.getString("selected_seats"));
                tickets.add(c);
            }

        } catch (Exception e) {
            System.err.println("Error fetching tickets from DB:");
            e.printStackTrace();
        }

        return tickets;
    }

    // ✅ Insert new booking
    public boolean bookTicket(Concert concert) {
        String sql = "INSERT INTO tickets (name, email, phone, selected_seats) VALUES (?, ?, ?, ?)";
        System.out.println("Attempting to book ticket for: " + concert.getName());

        try (Connection con = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement stmt = con.prepareStatement(sql)) {

            stmt.setString(1, concert.getName());
            stmt.setString(2, concert.getEmail());
            stmt.setInt(3, concert.getPhone());
            stmt.setString(4, concert.getSelectedSeats());

            int rows = stmt.executeUpdate();
            if (rows > 0) {
                System.out.println("Booking inserted successfully!");
                return true;
            } else {
                System.out.println("Booking failed: no rows affected.");
                return false;
            }

        } catch (Exception e) {
            System.err.println("Error booking ticket:");
            e.printStackTrace();
            return false;
        }
    }
}
