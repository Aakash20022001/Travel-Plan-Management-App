package com.cspl.travelplanmanagement2.Services.impl;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cspl.travelplanmanagement2.Dto.TravelPlanDTO;
import com.cspl.travelplanmanagement2.Dto.UserDTO;
import com.cspl.travelplanmanagement2.Entity.TravelPlan;
import com.cspl.travelplanmanagement2.Entity.User;
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

        // Update the fields of existingTravelPlan with the values from travelPlanDTO
        existingTravelPlan.setOrigin(travelPlanDTO.getOrigin());
        existingTravelPlan.setDestination(travelPlanDTO.getDestination());
        existingTravelPlan.setStartDate(travelPlanDTO.getStartDate());
        existingTravelPlan.setEndDate(travelPlanDTO.getEndDate());
        existingTravelPlan.setDescription(travelPlanDTO.getDescription());
        existingTravelPlan.setBudget(travelPlanDTO.getBudget());
        existingTravelPlan.setImageUrl(travelPlanDTO.getImageUrl());

        // Save the updated TravelPlan
        TravelPlan updatedTravelPlan = travelPlanRepository.save(existingTravelPlan);

        // Convert and return the updated TravelPlanDTO
        return convertToDTO(updatedTravelPlan);
    }

    @Override
    public void deleteTravelPlan(Long id) {
        travelPlanRepository.deleteById(id);
    }

    @Override
    public List<UserDTO> getUsersForTravelPlan(Long travelPlanId) {
        TravelPlan travelPlan = travelPlanRepository.findById(travelPlanId)
                .orElseThrow(() -> new ResourceNotFoundException("Travel Plan not found with id: " + travelPlanId));

        Set<User> registeredUsers = travelPlan.getRegisteredUsers();
        return registeredUsers.stream().map(this::convertUserToDTO).collect(Collectors.toList());
    }

    private TravelPlanDTO convertToDTO(TravelPlan travelPlan) {
        return new TravelPlanDTO(travelPlan.getId(), travelPlan.getOrigin(), travelPlan.getDestination(),
                travelPlan.getStartDate(), travelPlan.getEndDate(), travelPlan.getDescription(), travelPlan.getBudget(),
                travelPlan.getImageUrl());
    }

    private UserDTO convertUserToDTO(User user) {
        return new UserDTO(user.getUser_id(), user.getFullName(), user.getEmail(), user.getCity(),
                user.getContactNumber(), user.getPassword(), user.getGender(), user.getRole(),
                user.getRegisteredTravelPlans().stream().map(this::convertToDTO).collect(Collectors.toSet()));
    }

    private TravelPlan convertToEntity(TravelPlanDTO travelPlanDTO) {
        TravelPlan travelPlan = new TravelPlan();
        travelPlan.setOrigin(travelPlanDTO.getOrigin());
        travelPlan.setDestination(travelPlanDTO.getDestination());
        travelPlan.setStartDate(travelPlanDTO.getStartDate());
        travelPlan.setEndDate(travelPlanDTO.getEndDate());
        travelPlan.setDescription(travelPlanDTO.getDescription());
        travelPlan.setBudget(travelPlanDTO.getBudget());
        travelPlan.setImageUrl(travelPlanDTO.getImageUrl());
        return travelPlan;
    }
}
