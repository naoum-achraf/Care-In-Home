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
public class MédicamentController {
	@Autowired
	private MédicamentRepo Repo;
	
	@Autowired
	private User_médicamentRepo Repo1;
	
	@RequestMapping("/allMédicaments")
	public Iterable<Médicament> getVoitures(){
		return Repo.findAll();
	}
	
	@RequestMapping("/Médicament/{id}")
	public List<Long> getProgress(@PathVariable Long id) {
		return Repo1.getAvailable(id); 
		}

	@PutMapping("/Médicament/add1/{id}")
	public ResponseEntity<?> updateprogress1(@PathVariable Long id) {
			Repo1.updateProgress(id, (long) 2);
		return ResponseEntity.ok(new MessageResponse("updated avec succès!"));
	}
	
	@PutMapping("/Médicament/add2/{id}")
	public ResponseEntity<?> updateprogress2(@PathVariable Long id) {
			Repo1.updateProgress(id, (long) 1);
		return ResponseEntity.ok(new MessageResponse("updated avec succès!"));
	}

}
