package com.example.smartcareerbackend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDTO {

    private String name;
    private String email;
    private String phone;
    private String bio;
}