package com.example.smartcareerbackend.repository;

import com.example.smartcareerbackend.entity.Role;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.smartcareerbackend.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
    long countByRole(Role role);
}
