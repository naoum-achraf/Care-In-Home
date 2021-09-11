package com.CiH.login.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.CiH.login.models.ERole;
import com.CiH.login.models.User;
import com.CiH.login.models.User_role;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByUsername(String username);

	Boolean existsByUsername(String username);

	Boolean existsByEmail(String email);
	
	@Query(value="Select * from user where id in(select user_id from user_role where role_id = 2)",nativeQuery = true)
	public List<User> getAllAgent();
	
	@Query(value="Select * from user where id in(select user_id from user_role where role_id = 1 AND respo = ?1)",nativeQuery = true)
	public List<User> getAllPatient(Long idRes);
	
	@Query(value="select * from user where id in("
			+ "Select user_id from user_role where resultat = false AND respo = ?1)",nativeQuery = true)
	public List<User> getNégative(Long idRes);
	
	@Query(value="select * from user where id in("
			+ "Select user_id from user_role where resultat = false)",nativeQuery = true)
	public List<User> getAllNégatives();
	
	@Query(value="Select * from user where id in(select user_id from user_role where role_id = 1)",nativeQuery = true)
	public List<User> getAllPatient();
	
	
	@Query(value="Select * from user where id in(select respo from user_role where user_id = ?1)",nativeQuery = true)
	public List<User> getRespo(Long id);

	
}
