package com.projak.karnatak.migration.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "docMapping")
public class docMapping {

	@Id
	private String docCode;
	private String documentClass;
	public String getDocCode() {
		return docCode;
	}
	public void setDocCode(String docCode) {
		this.docCode = docCode;
	}
	public String getDocumentClass() {
		return documentClass;
	}
	public void setDocumentClass(String documentClass) {
		this.documentClass = documentClass;
	}
	@Override
	public String toString() {
		return "docMapping [docCode=" + docCode + ", documentClass=" + documentClass + "]";
	}
	
}
