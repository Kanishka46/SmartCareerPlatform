package com.example.smartcareerbackend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Education {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String degree;
    private String institution;
    private String specialization;
    private int startYear;
    private int endYear;
    private double cgpa;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}