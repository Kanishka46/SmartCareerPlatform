package com.example.smartcareerbackend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecruiterProfileRequest {
    private Long userId;
    private String companyName;
    private String designation;
    private String companyWebsite;
    private String phone;
}
