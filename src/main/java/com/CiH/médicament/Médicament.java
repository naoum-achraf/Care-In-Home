package com.CiH.médicament;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.CiH.login.models.User_role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Entity
public class Médicament {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
		private long id;
	
		@NonNull
		private String name;
		
		private float prix;
		
		private int durée;
		
		private int nbrfoispj;
		
		public Médicament() {
			
		}
	public long getId() {
		return id;
	}
	public Médicament(long id, @NonNull String name, float prix, int durée, int nbrfoispj) {
		super();
		this.id = id;
		this.name = name;
		this.prix = prix;
		this.durée = durée;
		this.nbrfoispj = nbrfoispj;
	}
	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Médicament(@NonNull String name, float prix, int durée, int nbrfoispj) {
		super();
		this.name = name;
		this.prix = prix;
		this.durée = durée;
		this.nbrfoispj = nbrfoispj;
	}

	public float getPrix() {
		return prix;
	}

	public void setPrix(float prix) {
		this.prix = prix;
	}

	public int getDurée() {
		return durée;
	}

	public void setDurée(int durée) {
		this.durée = durée;
	}

	public int getNbrfoispj() {
		return nbrfoispj;
	}

	public void setNbrfoispj(int nbrfoispj) {
		this.nbrfoispj = nbrfoispj;
	}

	
	@OneToMany(mappedBy = "médicament",cascade = CascadeType.ALL)
    Set<User_médicament> progress;

}
