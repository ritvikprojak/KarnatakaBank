package com.projak.icm.controller;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.projak.icm.service.ICMService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/icm")
public class ICMController {

	@Autowired
	ICMService service;

	@Autowired
	private Environment env;

	@GetMapping(value = {"/generateDocumentUrl/{larNo}"}, produces = {"application/json"})
	  public ResponseEntity<?> generateDocumentUrl(@PathVariable("larNo") String larNo) throws Exception {
	    JSONArray jsonArray = service.generateDocumentUrl(larNo);
	    return ResponseEntity.status(HttpStatus.OK).body(jsonArray.toString());
	}
	
	@PostMapping(value = "/generateDocList", produces = "application/json")
	public ResponseEntity<?> generateDocList(@RequestBody String body) throws Exception {
		JSONObject jobj = new JSONObject(body);
		String docDate = jobj.getString("Date");
		String osName = jobj.getString("ObjectStore");
		
		JSONArray jsonArray = service.generateDocList(docDate, osName);
		return ResponseEntity.status(HttpStatus.OK).body(jsonArray.toString());
	}

	@PostMapping(value = "/updateCaseStatus/{status}/{refreneceNo}", produces = "application/json")
	public ResponseEntity<?> updateCaseStatus(@PathVariable("status") String status,
			@PathVariable("refreneceNo") String refreneceNo) throws Exception {
		JSONArray caseStatus = service.updateCaseStatus(status, refreneceNo);
		return ResponseEntity.status(HttpStatus.OK).body(caseStatus.toString());
	}

	@GetMapping(value = "/generateRefrenceNumber/{larNumber}/{customerId}", produces = "application/json")
	public ResponseEntity<String> generateRefrenceNumber(@PathVariable("larNumber") String larNo,
			@PathVariable("customerId") String customerId) {
		String refrenceNumber = service.generateRefrenceNumber(larNo, customerId);
		JSONObject jobj = new JSONObject(refrenceNumber);
		return ResponseEntity.ok().body(jobj.toString());
	}
}