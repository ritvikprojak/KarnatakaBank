package com.projak.karnatak.migration.model;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "casesoutput")
public class casesoutput {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int id;
	String proposalNumber;
	String leadNumber;
	String productCode;
	int branchCode;
	String loanStatus;
	Date approvalDate;
	Date disbursalDate;
	String sourceSystemName;
	String customerName;
	String customerId;
	String uciccode;
	String mobileNumber;
	String folderId;
	String status;
	String message;
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getProposalNumber() {
		return proposalNumber;
	}
	
	public void setProposalNumber(String proposalNumber) {
		this.proposalNumber = proposalNumber;
	}
	
	public String getLeadNumber() {
		return leadNumber;
	}
	
	public void setLeadNumber(String leadNumber) {
		this.leadNumber = leadNumber;
	}
	
	public String getProductCode() {
		return productCode;
	}
	
	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}
	
	public int getBranchCode() {
		return branchCode;
	}
	
	public void setBranchCode(int branchCode) {
		this.branchCode = branchCode;
	}
	
	public String getLoanStatus() {
		return loanStatus;
	}
	
	public void setLoanStatus(String loanStatus) {
		this.loanStatus = loanStatus;
	}
	
	public Date getApprovalDate() {
		return approvalDate;
	}
	
	public void setApprovalDate(Date approvalDate) {
		this.approvalDate = approvalDate;
	}
	
	public Date getDisbursalDate() {
		return disbursalDate;
	}
	
	public void setDisbursalDate(Date disbursalDate) {
		this.disbursalDate = disbursalDate;
	}
	
	public String getSourceSystemName() {
		return sourceSystemName;
	}
	
	public void setSourceSystemName(String sourceSystemName) {
		this.sourceSystemName = sourceSystemName;
	}
	
	public String getCustomerName() {
		return customerName;
	}
	
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	
	public String getCustomerId() {
		return customerId;
	}
	
	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}
	
	public String getUCICCode() {
		return uciccode;
	}
	
	public void setUCICCode(String uCICCode) {
		uciccode = uCICCode;
	}
	
	public String getMobileNumber() {
		return mobileNumber;
	}
	
	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}
	
	public String getFolderId() {
		return folderId;
	}

	public void setFolderId(String folderId) {
		this.folderId = folderId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@Override
	public String toString() {
		return "casesoutput [ proposalNumber=" + proposalNumber + ", leadNumber=" + leadNumber
				+ ", productCode=" + productCode + ", branchCode=" + branchCode + ", loanStatus=" + loanStatus
				+ ", approvalDate=" + approvalDate + ", disbursalDate=" + disbursalDate + ", sourceSystemName="
				+ sourceSystemName + ", customerName=" + customerName + ", customerId=" + customerId + ", UCICCode="
				+ uciccode + ", mobileNumber=" + mobileNumber + ", folderId="+ folderId +", status=" + status + ", message=" + message + "]";
	}



}
