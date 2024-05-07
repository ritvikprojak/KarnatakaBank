package com.projak.icm.controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.projak.icm.service.KbankService;

@RestController
@CrossOrigin
@RequestMapping("/laps")
public class KbankController {
	
	@Autowired
	private KbankService kbankService;
	
	
	@GetMapping(value = "/lar" , produces = "application/json")
	public ResponseEntity<String> getLAR(@RequestParam(value = "larNumber")String larNumber){
		
		String output = kbankService.getLARDetails(larNumber);
		
		JSONObject jobj = new JSONObject(output);
		
		return ResponseEntity.ok().body(jobj.toString());
		
	}
	
	@GetMapping(value = "/userId" , produces = "application/json")
	public ResponseEntity<String> getUserDetails(@RequestParam(value = "userId")String userId){
		
		String output = kbankService.getUserDetails(userId);
		
		JSONObject jobj = new JSONObject(output);
		
		return ResponseEntity.ok().body(jobj.toString());
		
	}
	
	@GetMapping(value = "/userROId" , produces = "application/json")
	public ResponseEntity<String> getUserRODetails(@RequestParam(value = "userId")String userId){
		
		String output = kbankService.getUserRODetails(userId);
		
		JSONObject jobj = new JSONObject(output);
		
		return ResponseEntity.ok().body(jobj.toString());
		
	}

}
