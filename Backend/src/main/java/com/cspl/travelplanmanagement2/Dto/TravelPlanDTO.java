package com.cspl.travelplanmanagement2.Dto;

import java.time.LocalDate;

public class TravelPlanDTO {

	private Long id;
	private String origin;
	private String destination;
	private LocalDate startDate;
	private LocalDate endDate;
	private String description;
	private long budget;
	private String imageUrl;

	public TravelPlanDTO() {
	}

	public TravelPlanDTO(Long id, String origin, String destination, LocalDate startDate, LocalDate endDate,
			String description, long budget, String imageUrl) {
		this.id = id;
		this.origin = origin;
		this.destination = destination;
		this.startDate = startDate;
		this.endDate = endDate;
		this.description = description;
		this.budget = budget;
		this.imageUrl = imageUrl;
	}

	// Getter and Setter methods...

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

	// Additional methods if needed...

	@Override
	public String toString() {
		return "TravelPlanDTO [id=" + id + ", origin=" + origin + ", destination=" + destination + ", startDate="
				+ startDate + ", endDate=" + endDate + ", description=" + description + ", budget=" + budget
				+ ", imageUrl=" + imageUrl + "]";
	}
}
