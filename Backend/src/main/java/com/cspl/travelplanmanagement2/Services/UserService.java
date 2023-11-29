package com.cspl.travelplanmanagement2.Services;

import org.springframework.stereotype.Service;

import com.cspl.travelplanmanagement2.Dto.LoginDTO;
import com.cspl.travelplanmanagement2.Dto.UserDTO;
import com.cspl.travelplanmanagement2.response.LoginResponse;

@Service
public interface UserService {

	String addUser(UserDTO userDto);

	LoginResponse loginUser(LoginDTO loginDTO);

	UserDTO getUserById(Long userId);

//	Collection<? extends GrantedAuthority> getAuthorities();
	void addUserToTravelPlan(Long userId, Long travelPlanId);

	void removeUserFromTravelPlan(Long userId, Long travelPlanId);

}
