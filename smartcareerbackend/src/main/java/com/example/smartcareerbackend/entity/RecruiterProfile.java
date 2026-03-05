// entity/RecruiterProfile.java
package com.example.smartcareerbackend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RecruiterProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String companyName;
    private String designation;
    private String companyWebsite;
    private String phone;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private User user;
}
