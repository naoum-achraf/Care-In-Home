package com.CiH.médicament;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.CiH.login.models.User;
import com.CiH.login.payload.response.MessageResponse;



@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class User_médicamentController {
	
	@Autowired
	private User_médicamentRepo Repo1;
	
	
	@GetMapping("/encours/{id}")
	public List<User_médicament> nbrPatient(@PathVariable Long id) {
		return Repo1.getNbr(id);
	}
	
	@GetMapping("/enAttent/{id}")
	public List<User_médicament> nbrAttent(@PathVariable Long id) {
		return Repo1.getNbrAtt(id);
	}
}
