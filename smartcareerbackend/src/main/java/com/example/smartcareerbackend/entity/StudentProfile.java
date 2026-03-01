package com.example.smartcareerbackend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String phone;
    private String address;
    private String linkedinUrl;
    private String githubUrl;
    private String bio;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}