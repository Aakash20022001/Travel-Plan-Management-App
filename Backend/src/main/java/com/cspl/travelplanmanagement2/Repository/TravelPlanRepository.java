package com.cspl.travelplanmanagement2.Repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cspl.travelplanmanagement2.Entity.TravelPlan;
import com.cspl.travelplanmanagement2.Entity.User;

//import com.cspl.travelplanmanagement.model.TravelPlan;

@Repository
public interface TravelPlanRepository extends JpaRepository<TravelPlan, Long> {
	@Modifying
	@Query("UPDATE TravelPlan tp SET tp.registeredUsers = :users WHERE tp.id = :travelPlanId")
	void addUserToTravelPlan(@Param("users") Set<User> users, @Param("travelPlanId") Long travelPlanId);

	@Modifying
	@Query("UPDATE TravelPlan tp SET tp.registeredUsers = :users WHERE tp.id = :travelPlanId")
	void removeUserFromTravelPlan(@Param("users") Set<User> users, @Param("travelPlanId") Long travelPlanId);
}
