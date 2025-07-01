package com.hms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.hms.model.Hotel;
import com.hms.repo.HotelRepository;
import com.hms.service.HotelService;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/hotels")
@CrossOrigin(origins = "*")
public class HotelController {

	 	@Autowired
	    private HotelService hotelService;

	    @GetMapping("/search")
	    public List<Hotel> searchHotels(@RequestParam String location) {
	        return hotelService.getHotelsByLocation(location);
	    }
    
}   
    
    
    
    
    
    
    
	/*
	 * private static final String UPLOAD_DIR = "uploads";
	 * // Add a hotel normally (no image)
	 * 
	 * @PostMapping public Hotel addHotel(@RequestBody Hotel hotel) { return
	 * hotelRepository.save(hotel); }
	 * 
	 * 
	 * 
	 * // Search hotels by city
	 * 
	 * @GetMapping("/search") public List<Hotel> searchHotels(@RequestParam String
	 * city) { return hotelRepository.findByCityIgnoreCase(city); }
	 * 
	 * // Get all hotels
	 * 
	 * @GetMapping public List<Hotel> getAllHotels() { return
	 * hotelRepository.findAll(); }
	 * 
	 * 
	 * 
	 * // Add a hotel with image upload
	 * 
	 * @PostMapping(value = "/upload", consumes =
	 * MediaType.MULTIPART_FORM_DATA_VALUE) public Hotel uploadHotel(
	 * 
	 * @RequestPart("image") MultipartFile file,
	 * 
	 * @RequestPart("hotel") Hotel hotel) throws IOException {
	 * 
	 * // Generate unique filename and save file String filename = UUID.randomUUID()
	 * + "_" + file.getOriginalFilename(); Path filePath = Paths.get(UPLOAD_DIR,
	 * filename); Files.createDirectories(filePath.getParent());
	 * Files.write(filePath, file.getBytes());
	 * 
	 * // Store filename in DB hotel.setImageName(filename); return
	 * hotelRepository.save(hotel); }
	 * 
	 * // Serve uploaded image
	 * 
	 * @GetMapping("/images/{filename}") public ResponseEntity<Resource>
	 * getImage(@PathVariable String filename) throws IOException { Path imagePath =
	 * Paths.get(UPLOAD_DIR).resolve(filename); Resource resource = new
	 * UrlResource(imagePath.toUri());
	 * 
	 * if (!resource.exists()) { return ResponseEntity.notFound().build(); }
	 * 
	 * return ResponseEntity.ok() .contentType(MediaType.IMAGE_JPEG)
	 * .body(resource); }
	 */


