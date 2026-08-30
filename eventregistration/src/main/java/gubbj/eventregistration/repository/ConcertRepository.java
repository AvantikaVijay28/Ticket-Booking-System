package gubbj.eventregistration.repository;

import gubbj.eventregistration.model.Concert;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConcertRepository extends JpaRepository<Concert, Long> {
}