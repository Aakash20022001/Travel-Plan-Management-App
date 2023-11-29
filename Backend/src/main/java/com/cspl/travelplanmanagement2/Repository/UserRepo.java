package com.cspl.travelplanmanagement2.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import com.cspl.travelplanmanagement2.Entity.User;

@EnableJpaRepositories
@Repository
public interface UserRepo extends JpaRepository<User, Long> {
	Optional<User> findOneByEmailAndPassword(String email, String password);

	User findByEmail(String email);
}
