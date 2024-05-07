package com.projak.icm.controller;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.projak.icm.service.LdapService;

@RestController
@CrossOrigin
@RequestMapping("/ldap")
public class LdapController {
	
	private static final Logger logger = LoggerFactory.getLogger(LdapController.class);
	
	@Autowired
	private LdapService ldapService;

	@GetMapping(value = "/solId", produces = "application/json")
	public final ResponseEntity<String> getSolId(@RequestParam(name = "userId") String userId) {

		String sol = ldapService.getSolId(userId);
		
		JSONObject jobj = new JSONObject();
		
		if(sol != null) {
			jobj.put("SOLID",sol);
			return new ResponseEntity<>(jobj.toString(),HttpStatus.OK);
		}else {
			return new ResponseEntity<>(jobj.toString(),HttpStatus.BAD_REQUEST);
		}

		

	}
	
	@PostMapping(value = "/demo", produces="application/json")
	public final String Demo() {
		System.out.println("Demo");
		String demo = "{\r\n" + 
				"    \"data\": {\r\n" + 
				"        \"InwardDetails\": {\r\n" + 
				"            \"BankScheme\": \"003\",\r\n" + 
				"            \"CbsCustId\": \"962678567\",\r\n" + 
				"            \"InwardNo\": \"12720813419\",\r\n" + 
				"            \"PanNo\": \"BIJJP5432Q\",\r\n" + 
				"            \"OrganisationCode\": \"127\",\r\n" + 
				"            \"CustomerName\": \"HARISH\",\r\n" + 
				"            \"AppStatus\": \"In process\",\r\n" + 
				"            \"MobileNo\": \"8148388165\"\r\n" + 
				"        }\r\n" + 
				"    },\r\n" + 
				"    \"resp_code\": \"LAPS-1031\",\r\n" + 
				"    \"resp_msg\": \"larInwardDetails service Completed Successfully\"\r\n" + 
				"}";
		
		logger.info(demo);
		return demo;
	}

}
