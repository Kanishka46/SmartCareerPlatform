package com.example.smartcareerbackend.service;

import com.example.smartcareerbackend.entity.Role;
import com.example.smartcareerbackend.entity.User;
import com.example.smartcareerbackend.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final EmailService emailService;   // ⭐ NEW

    // ⭐ Fixed Admin Credentials
    private static final String ADMIN_EMAIL = "admin@smartcareer.com";
    private static final String ADMIN_PASSWORD = "admin123";

    // ⭐ Updated Constructor (Inject EmailService)
    public AuthService(UserRepository userRepository,
                       BCryptPasswordEncoder passwordEncoder,
                       EmailService emailService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    // ============================================================
    // ✅ REGISTER USER + SEND ROLE-BASED EMAIL
    // ============================================================
    public User register(User user) {

        // Encrypt password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Save user in DB
        User savedUser = userRepository.save(user);

        // ⭐ SEND EMAIL ONLY IF NOT ADMIN
        if (savedUser.getRole() != Role.ADMIN) {

            emailService.sendRegistrationEmail(
                    savedUser.getEmail(),
                    savedUser.getName(),
                    savedUser.getRole()
            );
        }

        return savedUser;
    }

    // ============================================================
    // ✅ LOGIN
    // ============================================================
    public User login(String email, String password) {

        // ⭐ STATIC ADMIN LOGIN
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