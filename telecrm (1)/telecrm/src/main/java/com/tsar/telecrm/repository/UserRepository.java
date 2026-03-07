package com.tsar.telecrm.repository;

import com.tsar.telecrm.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,String> {
    User findByEmployeeId(String employeeId);
    Optional<User> findByEmail(String email);
}
