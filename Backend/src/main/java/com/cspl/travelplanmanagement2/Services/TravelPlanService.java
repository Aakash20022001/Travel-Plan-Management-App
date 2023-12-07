package com.cspl.travelplanmanagement2.Services;

import java.util.List;
import com.cspl.travelplanmanagement2.Dto.TravelPlanDTO;
import com.cspl.travelplanmanagement2.Dto.UserDTO;

public interface TravelPlanService {

    List<TravelPlanDTO> getAllTravelPlans();

    TravelPlanDTO getTravelPlanById(Long id);

    Long createTravelPlan(TravelPlanDTO travelPlanDTO);

    TravelPlanDTO updateTravelPlan(Long id, TravelPlanDTO travelPlanDTO);

    void deleteTravelPlan(Long id);

    List<UserDTO> getUsersForTravelPlan(Long travelPlanId);
}
