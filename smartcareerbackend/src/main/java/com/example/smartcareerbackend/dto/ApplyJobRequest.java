// dto/ApplyJobRequest.java
package com.example.smartcareerbackend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApplyJobRequest {
    private Long jobSeekerId;
    private String coverLetter;
    private String resumeUrl;
}
