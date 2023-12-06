package com.cspl.travelplanmanagement2.Entity;

import java.util.HashSet;
import java.util.Set;

import org.springframework.web.bind.annotation.CrossOrigin;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@CrossOrigin
@Entity
@Table(name = "users")
public class User {

	@Id
	@Column(name = "user_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long user_id;

	@Column(name = "full_name")
	private String fullName;

	@Column(name = "email", unique = true)
	private String email;

	@Column(name = "city")
	private String city;

	@Column(name = "contact_number")
	private String contactNumber;

	@Column(name = "password")
	private String password;

	@Column(name = "gender")
	private String gender;

	@Column(name = "role")
	private String role = "ROLE_USER";

	@ManyToMany(mappedBy = "registeredUsers")
	private Set<TravelPlan> registeredTravelPlans = new HashSet<>();

	public Set<TravelPlan> getRegisteredTravelPlans() {
		return registeredTravelPlans;
	}

	public void setRegisteredTravelPlans(Set<TravelPlan> registeredTravelPlans) {
		this.registeredTravelPlans = registeredTravelPlans;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public User() {

	}

	public User(Long user_id, String fullName, String email, String city, String contactNumber, String password,
			String gender, String role) {
		super();
		this.user_id = user_id;
		this.fullName = fullName;
		this.email = email;
		this.city = city;
		this.contactNumber = contactNumber;
		this.password = password;
		this.gender = gender;
		this.role = role;
	}

	public Long getUser_id() {
		return user_id;
	}

	public void setUser_id(Long id) {
		this.user_id = id;
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

	@Override
	public String toString() {
		return "Users [user_id=" + user_id + ", fullName=" + fullName + ", email=" + email + ", city=" + city
				+ ", contactNumber=" + contactNumber + ", password=" + password + ", gender=" + gender + "]";
	}
}
