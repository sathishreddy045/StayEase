package com.sathish.stayease.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.StorageClient;
import com.sathish.stayease.exception.OurException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.InputStream;

@Service
public class FirebaseService {

    @Value("${firebase.credentials.file}")
    private String firebaseCredentialsPath;

    private static final String FIREBASE_BUCKET_NAME = "stay-ease-firebase.firebasestorage.app";

    @PostConstruct
    public void initializeFirebase() {
        try {
            if (FirebaseApp.getApps().isEmpty()) {
                InputStream serviceAccount = new ClassPathResource(firebaseCredentialsPath).getInputStream();
                FirebaseOptions options = FirebaseOptions.builder()
                        .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                        .setStorageBucket(FIREBASE_BUCKET_NAME)
                        .build();
                FirebaseApp.initializeApp(options);
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new OurException("Firebase initialization failed: " + e.getMessage());
        }
    }

    public String uploadImage(MultipartFile file) {
        return saveImageToFirebase(file);
    }

    public String saveImageToFirebase(MultipartFile photo) {
        if (photo == null) {
            throw new OurException("Photo is null. Please provide a valid file.");
        }
        try {
            String fileName = photo.getOriginalFilename();

            StorageClient storageClient = StorageClient.getInstance();
            storageClient.bucket().create(fileName, photo.getInputStream(), photo.getContentType());

            return "https://firebasestorage.googleapis.com/v0/b/" +
                    FIREBASE_BUCKET_NAME +
                    "/o/" + fileName + "?alt=media";

        } catch (Exception e) {
            e.printStackTrace();
            throw new OurException("Failed to upload image to Firebase Storage: " + e.getMessage());
        }
    }
}
