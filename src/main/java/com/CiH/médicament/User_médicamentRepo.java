package com.CiH.médicament;


import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.CiH.login.models.User;


public interface User_médicamentRepo extends CrudRepository<User_médicament, Long>{
	
	@Query(value="Select progress from user_médicament where user_id = ?1",nativeQuery = true)
	public List<Long> getAvailable(Long id);
	
	
	
	@Query(value="UPDATE user_médicament SET progress = progress + 1 WHERE user_id = ?1 AND médicament_id = ?2",nativeQuery = true)
	public void updateProgress(Long idUser,Long idMed);
	
	@Query(value="Select * from user_médicament where progress<7 AND médicament_id = 1 AND user_id in("
			+ "select user_id from user_role where respo = ?1)",nativeQuery = true)
	public List<User_médicament> getNbr(Long idRes);
	
	

	@Query(value="Select * from user_médicament where progress = 7 AND médicament_id = 1 AND user_id in("
			+ "select user_id from user_role where respo = ?1 AND resultat = true)",nativeQuery = true)
	public List<User_médicament> getNbrAtt(Long idRes);
}
