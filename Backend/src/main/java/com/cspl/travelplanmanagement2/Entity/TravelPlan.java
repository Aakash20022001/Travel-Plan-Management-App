package com.cspl.travelplanmanagement2.Entity;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import org.springframework.web.bind.annotation.CrossOrigin;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@CrossOrigin
@Entity
@Table(name = "travel_plans")
public class TravelPlan {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "origin")
	private String origin;

	@Column(name = "destination")
	private String destination;

	@Column(name = "start_date")
	private LocalDate startDate;

	@Column(name = "end_date")
	private LocalDate endDate;

	@Column(name = "description", length = 1000)
	private String description;

	@Column(name = "budget")
	private long budget;

	@Column(name = "image_url")
	private String imageUrl;

	@ManyToMany
	@JoinTable(name = "user_travel_plan", joinColumns = @JoinColumn(name = "travel_plan_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
	private Set<User> registeredUsers = new HashSet<>();

	public Set<User> getRegisteredUsers() {
		return registeredUsers;
	}

	public void setRegisteredUsers(Set<User> registeredUsers) {
		this.registeredUsers = registeredUsers;
	}

	// Constructors, getters, setters, and other methods...
	public TravelPlan() {

	}

	public TravelPlan(Long id, String origin, String destination, LocalDate startDate, LocalDate endDate,
			String description, long budget, String imageUrl) {
		super();
		this.id = id;
		this.origin = origin;
		this.destination = destination;
		this.startDate = startDate;
		this.endDate = endDate;
		this.description = description;
		this.budget = budget;
		this.imageUrl = imageUrl;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getOrigin() {
		return origin;
	}

	public void setOrigin(String origin) {
		this.origin = origin;
	}

	public String getDestination() {
		return destination;
	}

	public void setDestination(String destination) {
		this.destination = destination;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public LocalDate getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public long getBudget() {
		return budget;
	}

	public void setBudget(long budget) {
		this.budget = budget;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

}
