package gubbj.eventregistration.service;

import gubbj.eventregistration.model.Concert;
import gubbj.eventregistration.repository.ConcertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConcertService {

    @Autowired
    private ConcertRepository repository;

    public Concert bookTicket(Concert concert) {
        return repository.save(concert);
    }

    public List<Concert> getTickets() {
        return repository.findAll();
    }
}