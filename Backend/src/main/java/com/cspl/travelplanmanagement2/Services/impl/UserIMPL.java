package com.cspl.travelplanmanagement2.Services.impl;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cspl.travelplanmanagement2.Dto.LoginDTO;
import com.cspl.travelplanmanagement2.Dto.TravelPlanDTO;
import com.cspl.travelplanmanagement2.Dto.UserDTO;
import com.cspl.travelplanmanagement2.Entity.TravelPlan;
import com.cspl.travelplanmanagement2.Entity.User;
import com.cspl.travelplanmanagement2.Repository.TravelPlanRepository;
import com.cspl.travelplanmanagement2.Repository.UserRepo;
import com.cspl.travelplanmanagement2.Services.UserService;
import com.cspl.travelplanmanagement2.exceptions.ResourceNotFoundException;
import com.cspl.travelplanmanagement2.response.LoginResponse;

@Service
public class UserIMPL implements UserService {

	@Autowired
	private UserRepo userRepository;

	@Autowired
	private TravelPlanRepository travelPlanRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public String addUser(UserDTO userDto) {
		// TODO Auto-generated method stub
		User user = new User(userDto.getUser_id(), userDto.getFullName(), userDto.getEmail(), userDto.getCity(),
				userDto.getContactNumber(), this.passwordEncoder.encode(userDto.getPassword()), userDto.getGender(),
				userDto.getRole());

		userRepository.save(user);
		return user.getFullName();
	}

	@Override
	public void addUserToTravelPlan(Long userId, Long travelPlanId) {
		TravelPlan travelPlan = travelPlanRepository.findById(travelPlanId)
				.orElseThrow(() -> new ResourceNotFoundException("Travel Plan not found with id: " + travelPlanId));

		User user = userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

		travelPlan.getRegisteredUsers().add(user);
		travelPlanRepository.save(travelPlan);
	}

	@Override
	public void removeUserFromTravelPlan(Long userId, Long travelPlanId) {
		TravelPlan travelPlan = travelPlanRepository.findById(travelPlanId)
				.orElseThrow(() -> new ResourceNotFoundException("Travel Plan not found with id: " + travelPlanId));

		User user = userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

		travelPlan.getRegisteredUsers().remove(user);
		travelPlanRepository.save(travelPlan);
	}

	@Override
	public LoginResponse loginUser(LoginDTO loginDTO) {
		User user = userRepository.findByEmail(loginDTO.getEmail());
		if (user != null) {
			String password = loginDTO.getPassword();
			String encodedPassword = user.getPassword();
			boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);

			if (isPwdRight) {
				Optional<User> loggedInUser = userRepository.findOneByEmailAndPassword(loginDTO.getEmail(),
						encodedPassword);

				if (loggedInUser.isPresent()) {
					UserDTO userDTO = convertToDTO(loggedInUser.get());
					return new LoginResponse("Login Success", true, userDTO);
				} else {
					return new LoginResponse("Login Failed", false, null);
				}
			} else {
				return new LoginResponse("Password Not Match", false, null);
			}
		} else {
			return new LoginResponse("Email not exists", false, null);
		}
	}

	@Override
	public UserDTO getUserById(Long userId) {
		Optional<User> userOptional = userRepository.findById(userId);

		if (userOptional.isPresent()) {
			User user = userOptional.get();
			return convertToDTO(user);
		} else {
			throw new ResourceNotFoundException("User not found with ID: " + userId);
		}
	}

	private UserDTO convertToDTO(User user) {
		UserDTO userDTO = new UserDTO();
		userDTO.setUser_id(user.getUser_id());
		userDTO.setFullName(user.getFullName());
		userDTO.setEmail(user.getEmail());
		userDTO.setCity(user.getCity());
		userDTO.setContactNumber(user.getContactNumber());
		userDTO.setPassword(user.getPassword()); // Note: Storing password in DTO might not be a good practice
		userDTO.setGender(user.getGender());
		userDTO.setRole(user.getRole());
		userDTO.setRegisteredTravelPlans(convertTravelPlansToDTO(user.getRegisteredTravelPlans()));
		return userDTO;
	}

	private Set<TravelPlanDTO> convertTravelPlansToDTO(Set<TravelPlan> travelPlans) {
		return travelPlans.stream().map(this::convertToDTO).collect(Collectors.toSet());
	}

	private TravelPlanDTO convertToDTO(TravelPlan travelPlan) {
		TravelPlanDTO travelPlanDTO = new TravelPlanDTO();
		travelPlanDTO.setId(travelPlan.getId());
		travelPlanDTO.setOrigin(travelPlan.getOrigin());
		travelPlanDTO.setDestination(travelPlan.getDestination());
		travelPlanDTO.setStartDate(travelPlan.getStartDate());
		travelPlanDTO.setEndDate(travelPlan.getEndDate());
		travelPlanDTO.setDescription(travelPlan.getDescription());
		travelPlanDTO.setBudget(travelPlan.getBudget());
		travelPlanDTO.setImageUrl(travelPlan.getImageUrl());

		// Map other fields as needed

		return travelPlanDTO;
	}

}
