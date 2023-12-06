package com.cspl.travelplanmanagement2.Dto;

import java.util.Set;

public class UserDTO {

	private Long user_id;

	private String fullName;

	private String email;

	private String city;

	private String contactNumber;

	private String password;

	private String gender;

	private String role = "ROLE_USER";

	private Set<TravelPlanDTO> registeredTravelPlans;

	public Set<TravelPlanDTO> getRegisteredTravelPlans() {
		return registeredTravelPlans;
	}

	public void setRegisteredTravelPlans(Set<TravelPlanDTO> registeredTravelPlans) {
		this.registeredTravelPlans = registeredTravelPlans;
	}

	public UserDTO() {

	}

	public UserDTO(Long user_id, String fullName, String email, String city, String contactNumber, String password,
			String gender, String role, Set<TravelPlanDTO> registeredTravelPlans) {
		this.user_id = user_id;
		this.fullName = fullName;
		this.email = email;
		this.city = city;
		this.contactNumber = contactNumber;
		this.password = password;
		this.gender = gender;
		this.role = role;
		this.registeredTravelPlans = registeredTravelPlans;
	}

	public Long getUser_id() {
		return user_id;
	}

	public void setUser_id(Long user_id) {
		this.user_id = user_id;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	@Override
	public String toString() {
		return "UserDTO [user_id=" + user_id + ", fullName=" + fullName + ", email=" + email + ", city=" + city
				+ ", contactNumber=" + contactNumber + ", password=" + password + ", gender=" + gender + ", role="
				+ role + "]";
	}

}
