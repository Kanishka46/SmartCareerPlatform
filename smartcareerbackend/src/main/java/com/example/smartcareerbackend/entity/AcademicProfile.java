package com.example.smartcareerbackend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AcademicProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double tenthPercentage;
    private Double twelfthPercentage;
    private Double diplomaPercentage;
    private Double ugPercentage;

    private Boolean backlogHistory;
    private Integer currentBacklogs;
    private Boolean interestedInPlacement;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}