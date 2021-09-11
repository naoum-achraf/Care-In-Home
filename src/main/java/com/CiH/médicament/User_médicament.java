package com.CiH.médicament;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.CiH.login.models.Role;
import com.CiH.login.models.User;

@Entity
public class User_médicament {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	User user;
	
	@ManyToOne
	@JoinColumn(name = "médicament_id")
	Médicament médicament;
	
	Long progress;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Médicament getMédicament() {
		return médicament;
	}

	public void setMédicament(Médicament médicament) {
		this.médicament = médicament;
	}

	public Long getProgress() {
		return progress;
	}

	public void setProgress(Long progress) {
		this.progress = progress;
	}
	
	

	public User_médicament(Long id, User user, Médicament médicament, Long progress) {
		super();
		this.id = id;
		this.user = user;
		this.médicament = médicament;
		this.progress = progress;
	}
	
	public User_médicament () {}
	
	public User_médicament(Médicament médicament, Long progress) {
		super();
		this.médicament = médicament;
		this.progress = progress;
	}
}
