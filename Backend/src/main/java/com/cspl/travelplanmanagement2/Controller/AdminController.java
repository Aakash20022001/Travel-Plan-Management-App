package com.cspl.travelplanmanagement2.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cspl.travelplanmanagement2.Dto.TravelPlanDTO;
import com.cspl.travelplanmanagement2.Services.TravelPlanService;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/travelplans")
public class AdminController {

	@Autowired
	private TravelPlanService travelPlanService;

	// Get all travel plans
	@GetMapping
	public ResponseEntity<List<TravelPlanDTO>> getAllTravelPlans() {
		List<TravelPlanDTO> travelPlans = travelPlanService.getAllTravelPlans();
		return new ResponseEntity<>(travelPlans, HttpStatus.OK);
	}

	// Get a specific travel plan by ID
	@GetMapping("/{id}")
	public ResponseEntity<TravelPlanDTO> getTravelPlanById(@PathVariable Long id) {
		TravelPlanDTO travelPlanDTO = travelPlanService.getTravelPlanById(id);
		return new ResponseEntity<>(travelPlanDTO, HttpStatus.OK);
	}

	// Create a new travel plan
	@PostMapping
	public ResponseEntity<String> createTravelPlan(@RequestBody TravelPlanDTO travelPlanDTO) {
		Long id = travelPlanService.createTravelPlan(travelPlanDTO);
		return new ResponseEntity<>("Travel Plan created with ID: " + id, HttpStatus.CREATED);
	}

	// Update a travel plan
	@PutMapping("/{id}")
	public ResponseEntity<String> updateTravelPlan(@PathVariable Long id, @RequestBody TravelPlanDTO travelPlanDTO) {
		travelPlanService.updateTravelPlan(id, travelPlanDTO);
		return new ResponseEntity<>("Travel Plan updated successfully", HttpStatus.OK);
	}

	// Delete a travel plan
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteTravelPlan(@PathVariable Long id) {
		travelPlanService.deleteTravelPlan(id);
		return new ResponseEntity<>("Travel Plan deleted successfully", HttpStatus.OK);
	}
}
