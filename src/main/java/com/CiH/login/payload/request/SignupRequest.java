package com.CiH.login.payload.request;

import java.util.Set;

import javax.validation.constraints.*;

import com.CiH.login.models.Role;
 
public class SignupRequest {
    @NotBlank
    @Size(min = 3, max = 20)
    private String username;
 
    @NotBlank
    @Size(max = 50)
    @Email
    private String email;
    
    
	@Size(max = 50)
	private String age;
	
	private String hopitale;
	
	public String getHopitale() {
		return hopitale;
	}

	public void setHopitale(String hopitale) {
		this.hopitale = hopitale;
	}

	private Long respo;
    
    public Long getRespo() {
		return respo;
	}

	public void setRespo(Long respo) {
		this.respo = respo;
	}

	public String getAge() {
		return age;
	}

	public void setAge(String age) {
		this.age = age;
	}

	private Set<String> role;
    
    
    @Size(min = 6, max = 40)
    private String password;
  
    public String getUsername() {
        return username;
    }
 
    public void setUsername(String username) {
        this.username = username;
    }
 
    public String getEmail() {
        return email;
    }
 
    public void setEmail(String email) {
        this.email = email;
    }
 
    public String getPassword() {
        return password;
    }
 
    public void setPassword(String password) {
        this.password = password;
    }
    
    public Set<String> getRole() {
      return this.role;
    }
    
    public void setRole(Set<String> role) {
      this.role = role;
    }
    
    
}
