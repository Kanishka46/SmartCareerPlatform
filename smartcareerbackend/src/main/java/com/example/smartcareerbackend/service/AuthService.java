package com.example.smartcareerbackend.service;

import com.example.smartcareerbackend.entity.*;
import com.example.smartcareerbackend.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    // ⭐ Fixed Admin Credentials
    private static final String ADMIN_EMAIL = "admin@smartcareer.com";
    private static final String ADMIN_PASSWORD = "admin123";

    public AuthService(UserRepository userRepository,
                       BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // ✅ REGISTER USER (Role comes from UI)
    public User register(User user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // ✅ LOGIN
    public User login(String email, String password) {

        // ⭐ ADMIN LOGIN (hardcoded)
        if (email.equals(ADMIN_EMAIL) && password.equals(ADMIN_PASSWORD)) {

            User admin = new User();
            admin.setId(0L);
            admin.setName("Admin");
            admin.setEmail(ADMIN_EMAIL);
            admin.setRole(Role.ADMIN);

            return admin;
        }

        // ⭐ NORMAL USER LOGIN
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }
    

}