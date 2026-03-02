package com.example.smartcareerbackend.service;

import com.example.smartcareerbackend.entity.Role;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    // ⭐ ROLE-BASED WELCOME EMAIL
    public void sendRegistrationEmail(
            String toEmail,
            String name,
            Role role
    ) {

        String subject = "Welcome to Smart Career Platform 💖";
        String message = "";

        switch (role) {

            case STUDENT:
                message =
                    "Hi " + name + ",\n\n" +
                    "Welcome Student! 🎓\n" +
                    "You can now explore internships, upload resume, " +
                    "and get AI-based career guidance.\n\n" +
                    "Regards,\nSmart Career Team";
                break;

            case JOB_SEEKER:
                message =
                    "Hi " + name + ",\n\n" +
                    "Welcome Job Seeker! 💼\n" +
                    "Start exploring job opportunities tailored for you.\n\n" +
                    "Regards,\nSmart Career Team";
                break;

            case RECRUITER:
                message =
                    "Hi " + name + ",\n\n" +
                    "Welcome Recruiter! 🏢\n" +
                    "You can now post internships and hire candidates.\n\n" +
                    "Regards,\nSmart Career Team";
                break;

            default:
                return; // ADMIN or unknown → no email
        }

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(toEmail);
        mail.setSubject(subject);
        mail.setText(message);

        mailSender.send(mail);
    }
}