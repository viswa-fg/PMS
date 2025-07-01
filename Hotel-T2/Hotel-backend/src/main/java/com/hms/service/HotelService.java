package com.hms.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.model.Hotel;
import com.hms.repo.HotelRepository;

import java.util.List;

@Service
public class HotelService {

	@Autowired
    private HotelRepository hotelRepository;

    public List<Hotel> getHotelsByLocation(String location) {
        return hotelRepository.findByLocationIgnoreCase(location);
    }
}