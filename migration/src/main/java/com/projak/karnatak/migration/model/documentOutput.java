package com.projak.karnatak.migration.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "documentoutput")
public class documentOutput {


	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int Id;	
	String proposalNumber;
	String kind;
	String leadNumber;
	String docCode;
	String docSubType;
	String documentTitle;
	String path;
	String status;
	String message;

	@Column(name = "proposalNumber")
	public String getProposalNumber() {
		return proposalNumber;
	}

	public void setProposalNumber(String proposalNumber) {
		this.proposalNumber = proposalNumber;
	}

	
	@Column(name = "kind")
	public String getKind() {
		return kind;
	}

	public void setKind(String kind) {
		this.kind = kind;
	}

	@Column(name = "leadNumber")
	public String getLeadNumber() {
		return leadNumber;
	}

	public void setLeadNumber(String leadNumber) {
		this.leadNumber = leadNumber;
	}

	@Column(name = "docCode")
	public String getDocCode() {
		return docCode;
	}

	public void setDocCode(String docCode) {
		this.docCode = docCode;
	}

	@Column(name = "docSubType")
	public String getDocSubType() {
		return docSubType;
	}

	public void setDocSubType(String docSubType) {
		this.docSubType = docSubType;
	}

	public int getId() {
		return Id;
	}

	public void setId(int id) {
		Id = id;
	}

	public String getDocumentTitle() {
		return documentTitle;
	}

	public void setDocumentTitle(String documentTitle) {
		this.documentTitle = documentTitle;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	@Column(name = "status")
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Column(name = "message")
	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@Override
	public String toString() {
		return "documentOutput [Id=" + Id + ", proposalNumber=" + proposalNumber + ", kind=" + kind + ", leadNumber="
				+ leadNumber + ", docCode=" + docCode + ", docSubType=" + docSubType + ", documentTitle="
				+ documentTitle + ", path=" + path + ", status=" + status + ", message=" + message + "]";
	}


	
}
