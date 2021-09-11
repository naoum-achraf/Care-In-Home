package com.CiH.login.models;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class User_role {
	/**
	 * 
	 */

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	User user;
	
	@ManyToOne
	@JoinColumn(name = "role_id")
	Role role;
	
	Long Respo;
	
	Long alert;
	
	String message;

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public Long getAlert() {
		return alert;
	}

	public void setAlert(Long alert) {
		this.alert = alert;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getU() {
		return user;
	}

	public void setU(User u) {
		this.user = u;
	}

	public User_role(Long id, User user, Role role, Long respo) {
		super();
		this.id = id;
		this.user = user;
		this.role = role;
		Respo = respo;
	}

	public User_role() {
		super();
	}

	public Role getRoles() {
		return role;
	}

	public void setRoles(Role roles) {
		this.role = roles;
	}
	

	public Long getRespo() {
		return Respo;
	}

	public void setRespo(Long respo) {
		Respo = respo;
	}
	
	Boolean resultat;
	

	public Boolean getResultat() {
		return resultat;
	}

	public void setResultat(Boolean resultat) {
		this.resultat = resultat;
	}
	

	public User_role(Role r, Long respo,Boolean res,Long alert) {
		super();
		this.role = r;
		Respo = respo;
		this.resultat=res;
		this.alert =alert;
				}
	
	public User_role(Role r, Long respo) {
		super();
		this.role = r;
		Respo = respo;
				}
	
}
