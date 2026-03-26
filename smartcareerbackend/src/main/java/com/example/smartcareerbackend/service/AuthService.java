package com.example.smartcareerbackend.service;

import com.example.smartcareerbackend.dto.AuthRequest;
import com.example.smartcareerbackend.dto.AuthResponse;
import com.example.smartcareerbackend.dto.RegisterRequest;
import com.example.smartcareerbackend.entity.Role;
import com.example.smartcareerbackend.entity.User;
import com.example.smartcareerbackend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    private static final String ADMIN_EMAIL = "admin@smartcareer.com";
    private static final String ADMIN_PASSWORD = "Admin@123";

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public AuthService(
        UserRepository userRepository,
        BCryptPasswordEncoder passwordEncoder,
        EmailService emailService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    public AuthResponse register(RegisterRequest request) {
        String normalizedEmail = request.getEmail().trim().toLowerCase();

        if (normalizedEmail.equals(ADMIN_EMAIL)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "This email is reserved for admin access.");
        }

        if (userRepository.findByEmail(normalizedEmail).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email is already registered.");
        }

        User user = new User();
        user.setName(request.getName().trim());
        user.setEmail(normalizedEmail);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());

        User savedUser = userRepository.save(user);

        try {
            if (savedUser.getRole() != Role.ADMIN) {
                emailService.sendRegistrationEmail(savedUser.getEmail(), savedUser.getName(), savedUser.getRole());
            }
        } catch (Exception ignored) {
            // Registration succeeds even if email delivery is unavailable.
        }

        return buildResponse(savedUser, "Registration successful.");
    }

    public AuthResponse login(AuthRequest request) {
        String normalizedEmail = request.getEmail().trim().toLowerCase();

        if (normalizedEmail.equals(ADMIN_EMAIL) && ADMIN_PASSWORD.equals(request.getPassword())) {
            return new AuthResponse(0L, "Admin", ADMIN_EMAIL, Role.ADMIN, "Login successful.");
        }

        User user = userRepository.findByEmail(normalizedEmail)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password.");
        }

        return buildResponse(user, "Login successful.");
    }

    private AuthResponse buildResponse(User user, String message) {
        return new AuthResponse(user.getId(), user.getName(), user.getEmail(), user.getRole(), message);
    }
}
