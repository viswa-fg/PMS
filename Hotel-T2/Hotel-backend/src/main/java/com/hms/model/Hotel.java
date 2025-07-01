package com.hms.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import java.util.List;

@Data
@Document(collection = "hotels")
public class Hotel {
    @Id
    private String id;
    private String name;
    private String location;
    private double rating;
    private double pricePerDay;
    
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public double getRating() {
		return rating;
	}
	public void setRating(double rating) {
		this.rating = rating;
	}
	public double getPricePerDay() {
		return pricePerDay;
	}
	public void setPricePerDay(double pricePerDay) {
		this.pricePerDay = pricePerDay;
	}  
    
	/*
	 * private String thumbnailUrl;
	 * private String location;
	 * private boolean freeCancellation; private boolean bookAtZero; private boolean
	 * breakfastIncluded; private boolean loginOfferAvailable; private double
	 * taxesAndFees; private String distanceInfo; private List<String> tags;
	 */
    
    
    
   
    
    
}

