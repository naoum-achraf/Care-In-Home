package com.CiH;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;


@SpringBootApplication
public class CareInHomeApplication {
	public static void main(String[] args) {
		SpringApplication.run(CareInHomeApplication.class, args);
	}
	
	
	//@Bean
	//CommandLineRunner runner(){
	//return args -> {
	//agent.save(new Agent(1, "Achraf Naoum",  "naoumachraf@gmail.com", "Hassan II", "BJ454046", "AZERQSDF", null));
	//agent.save(new Agent(2, "Khalid Nafil",  "khalid@gmail.com", "Hassan IV", "BJ454046", "AZERcdsdfs8", null));
	//};
	//}
	
}
