package gubbj.eventregistration.service;

import gubbj.eventregistration.dao.ConcertDAO;
import gubbj.eventregistration.model.Concert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConcertService {

    @Autowired
    private ConcertDAO dao;

    public List<Concert> getAllTickets() {
        return dao.getAllTickets();
    }

    public boolean bookTicket(Concert concert) {
        return dao.bookTicket(concert);
    }
}
