package com.cspl.travelplanmanagement2.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cspl.travelplanmanagement2.Dto.LoginDTO;
import com.cspl.travelplanmanagement2.Dto.TravelPlanDTO;
import com.cspl.travelplanmanagement2.Dto.UserDTO;
import com.cspl.travelplanmanagement2.Services.TravelPlanService;
import com.cspl.travelplanmanagement2.Services.UserService;
import com.cspl.travelplanmanagement2.response.LoginResponse;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/users")
public class UserController {
	@Autowired
	private UserService userService;
	@Autowired
	private TravelPlanService travelPlanService;

	// Get all travel plans
	@GetMapping("/travelplans")
	public ResponseEntity<List<TravelPlanDTO>> getAllTravelPlans() {
		List<TravelPlanDTO> travelPlans = travelPlanService.getAllTravelPlans();
		return new ResponseEntity<>(travelPlans, HttpStatus.OK);
	}

	// Get a specific travel plan by ID
	@GetMapping("/travelplan/{id}")
	public ResponseEntity<TravelPlanDTO> getTravelPlanById(@PathVariable Long id) {
		TravelPlanDTO travelPlanDTO = travelPlanService.getTravelPlanById(id);
		return new ResponseEntity<>(travelPlanDTO, HttpStatus.OK);
	}

	// create user rest api
	@PostMapping(path = "/save")
	public String saveUser(@RequestBody UserDTO userDto) {
		String id = userService.addUser(userDto);
		return id;
	}

	@PostMapping(path = "/login")
	public ResponseEntity<?> loginUser(@RequestBody LoginDTO loginDTO) {
		LoginResponse loginResponse = userService.loginUser(loginDTO);
		return ResponseEntity.ok(loginResponse);
	}

	@GetMapping("/{userId}")
	public ResponseEntity<UserDTO> getUserById(@PathVariable Long userId) {
		try {
			UserDTO userDTO = userService.getUserById(userId);
			return new ResponseEntity<>(userDTO, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/{userId}/register/{travelPlanId}")
	public ResponseEntity<String> registerUserForTravelPlan(@PathVariable Long userId,
			@PathVariable Long travelPlanId) {
		userService.addUserToTravelPlan(userId, travelPlanId);
		return new ResponseEntity<>("User registered successfully for the travel plan.", HttpStatus.OK);
	}

	@PostMapping("/{userId}/deregister/{travelPlanId}")
	public ResponseEntity<String> deregisterUserFromTravelPlan(@PathVariable Long userId,
			@PathVariable Long travelPlanId) {
		userService.removeUserFromTravelPlan(userId, travelPlanId);
		return new ResponseEntity<>("User deregistered successfully from the travel plan.", HttpStatus.OK);
	}
}