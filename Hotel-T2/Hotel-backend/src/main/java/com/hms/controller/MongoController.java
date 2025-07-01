package com.hms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.Set;

@RestController
public class MongoController {

	   @Autowired
	    private MongoTemplate mongoTemplate;

	    @GetMapping("/ping")
	    public String ping() {
	        return "Connected to MongoDB with collections: " + mongoTemplate.getCollectionNames();
	    }

}