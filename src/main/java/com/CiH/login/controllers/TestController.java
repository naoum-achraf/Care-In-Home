package com.CiH.login.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.CiH.login.models.ERole;
import com.CiH.login.models.Role;
import com.CiH.login.models.User;
import com.CiH.login.models.User_role;
import com.CiH.login.payload.request.SignupRequest;
import com.CiH.login.payload.response.MessageResponse;
import com.CiH.login.repository.UserRepository;
import com.CiH.login.repository.user_roleRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {
	
	@Autowired
	UserRepository user;
	
	@Autowired
	user_roleRepository user_role;
	
	@GetMapping("/patient")
	@PreAuthorize("hasRole('PATIENT')")
	public String userAccess() {
		return "Contenue du patient.";
	}

	@GetMapping("/agent")
	@PreAuthorize("hasRole('AGENT')")
	public String moderatorAccess() {
		return "Agent Board.";
	}
	

	@GetMapping("/admin")
	@PreAuthorize("hasRole('ADMIN')")
	public String adminAccess() {
		return "Admin Board.";
	}
	
	
	@GetMapping("/allAgents")
	public List<User> allAgent() {
		return user.getAllAgent();
	}
	
	
	@GetMapping("/allPatients/{id}")
	public List<User> allPatient(@PathVariable Long id) {
		return user.getAllPatient(id);
	}
	
	@DeleteMapping("/Agents/{id}")
	public void supprimerAgent(@PathVariable Long id) {
		user.deleteById(id); }
	
	@RequestMapping("/Agent/{id}") 
	public Optional<User>
	  getAgent(@PathVariable Long id){ return user.findById(id); }
	
	@PutMapping("/Agent/{id}")
	public ResponseEntity<?> updateUser(@PathVariable Long id,@RequestBody User u) {
		User user1 = user.findById(id)
				.orElseThrow(() -> new RuntimeException("Agent not existe"));
		user1.setUsername(u.getUsername());
		user1.setEmail(u.getEmail());
		user1.setAge(u.getAge());
		User updt = user.save(user1);
		return ResponseEntity.ok(new MessageResponse("Utilisateur updated avec succès!"));
	}
	
	@PutMapping("/Resultat/T/{id}")
	public ResponseEntity<?> updateResultatT(@PathVariable Long id) {
		user_role.updateResultat(true,id);
		return ResponseEntity.ok(new MessageResponse("Resultat updated avec succès!"));
	}
	
	@PutMapping("/Resultat/F/{id}")
	public ResponseEntity<?> updateResultaF(@PathVariable Long id) {
		user_role.updateResultat(false,id);
		return ResponseEntity.ok(new MessageResponse("Resultat updated avec succès!"));
	}
	
	
	@GetMapping("/négative/{id}")
	public List<User_role> négative(@PathVariable Long id) {
		return user_role.getNégative(id);
	}
	
	@GetMapping("/résultat/{id}")
	public List<User_role> res(@PathVariable Long id) {
		return user_role.getRes(id);
	}
	
	@GetMapping("/négatives/{id}")
	public List<User> négatives(@PathVariable Long id) {
		return user.getNégative(id);
	}
	
	
	@PutMapping("/alert/{id}")
	public ResponseEntity<?> updateAlert(@PathVariable Long id) {
		user_role.updateAlert(id);
		return ResponseEntity.ok(new MessageResponse("Resultat updated avec succès!"));
	}
	
	
	@PutMapping("/message/{id}")
	public ResponseEntity<?> message(@PathVariable Long id,@RequestBody String msg) {
		user_role.SendMessage(msg, id);
		return ResponseEntity.ok(new MessageResponse("Utilisateur updated avec succès!"));
	}
	
	
	@GetMapping("/message/{id}")
	public List<User_role> getmessage(@PathVariable Long id) {
		return user_role.getMessage(id);
	}
	
	@GetMapping("/allNégatives")
	public List<User> négatives() {
		return user.getAllNégatives();
	}
	
	@GetMapping("/allPatients")
	public List<User> patients() {
		return user.getAllPatient();
	}
	
	@GetMapping("/Respo/{id}")
	public List<User> respo(@PathVariable Long id) {
		return user.getRespo(id);
	}
	
	
}
