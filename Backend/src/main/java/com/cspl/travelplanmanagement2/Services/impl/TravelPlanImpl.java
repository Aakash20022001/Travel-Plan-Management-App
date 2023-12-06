package com.cspl.travelplanmanagement2.Services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cspl.travelplanmanagement2.Dto.TravelPlanDTO;
import com.cspl.travelplanmanagement2.Entity.TravelPlan;
import com.cspl.travelplanmanagement2.Repository.TravelPlanRepository;
import com.cspl.travelplanmanagement2.Services.TravelPlanService;
import com.cspl.travelplanmanagement2.exceptions.ResourceNotFoundException;

@Service
public class TravelPlanImpl implements TravelPlanService {

	@Autowired
	private TravelPlanRepository travelPlanRepository;

	@Override
	public List<TravelPlanDTO> getAllTravelPlans() {
		List<TravelPlan> travelPlans = travelPlanRepository.findAll();
		return travelPlans.stream().map(this::convertToDTO).collect(Collectors.toList());
	}

	@Override
	public TravelPlanDTO getTravelPlanById(Long id) {
		TravelPlan travelPlan = travelPlanRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Travel Plan not found with id: " + id));
		return convertToDTO(travelPlan);
	}

	@Override
	public Long createTravelPlan(TravelPlanDTO travelPlanDTO) {
		TravelPlan travelPlan = convertToEntity(travelPlanDTO);
		TravelPlan savedTravelPlan = travelPlanRepository.save(travelPlan);
		return savedTravelPlan.getId();
	}

	@Override
	public TravelPlanDTO updateTravelPlan(Long id, TravelPlanDTO travelPlanDTO) {
		TravelPlan existingTravelPlan = travelPlanRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Travel Plan not found with id: " + id));

		// Update existingTravelPlan fields with values from travelPlanDTO
		// Example: existingTravelPlan.setName(travelPlanDTO.getName());
		// Update other properties similarly

		TravelPlan updatedTravelPlan = travelPlanRepository.save(existingTravelPlan);
		return convertToDTO(updatedTravelPlan);
	}

	@Override
	public void deleteTravelPlan(Long id) {
		travelPlanRepository.deleteById(id);
	}

	// Helper methods to convert between DTO and Entity
	private TravelPlanDTO convertToDTO(TravelPlan travelPlan) {
		// Convert TravelPlan to TravelPlanDTO
		return new TravelPlanDTO(travelPlan.getId(), travelPlan.getOrigin(), travelPlan.getDestination(),
				travelPlan.getStartDate(), travelPlan.getEndDate(), travelPlan.getDescription(), travelPlan.getBudget(),
				travelPlan.getImageUrl()
		// Map other properties
		);
	}

	private TravelPlan convertToEntity(TravelPlanDTO travelPlanDTO) {
		// Convert TravelPlanDTO to TravelPlan
		TravelPlan travelPlan = new TravelPlan();
		travelPlan.setOrigin(travelPlanDTO.getOrigin());
		travelPlan.setDestination(travelPlanDTO.getDestination());
		travelPlan.setStartDate(travelPlanDTO.getStartDate());
		travelPlan.setEndDate(travelPlanDTO.getEndDate());
		travelPlan.setDescription(travelPlanDTO.getDescription());
		travelPlan.setBudget(travelPlanDTO.getBudget());
		travelPlan.setImageUrl(travelPlanDTO.getImageUrl());
		return travelPlan;
		// Map other properties

	}
}
