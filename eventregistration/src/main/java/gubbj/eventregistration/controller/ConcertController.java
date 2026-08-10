package gubbj.eventregistration.controller;

import gubbj.eventregistration.model.Concert;
import gubbj.eventregistration.service.ConcertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/concerts")
@CrossOrigin(origins = "*")
public class ConcertController {

    @Autowired
    private ConcertService service;

    @GetMapping("/tickets")
    public List<Concert> getAllTickets() {
        return service.getAllTickets();
    }

    @PostMapping("/book")
    public String bookTicket(@RequestBody Concert concert) {
        return service.bookTicket(concert) ? "Booking successful!" : "Booking failed!";
    }
}
