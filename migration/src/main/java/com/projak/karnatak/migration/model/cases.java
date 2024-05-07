package com.projak.karnatak.migration.model;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "cases")
public class cases {
	
	String proposalNumber;
	@Id
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
	boolean uploadStatus;
	
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
	
	public String getUciccode() {
		return uciccode;
	}

	public void setUciccode(String uciccode) {
		this.uciccode = uciccode;
	}

	public String getMobileNumber() {
		return mobileNumber;
	}
	
	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}
	
	public boolean getUploadStatus() {
		return uploadStatus;
	}

	public void setUploadStatus(boolean uploadStatus) {
		this.uploadStatus = uploadStatus;
	}

	@Override
	public String toString() {
		return "cases [proposalNumber=" + proposalNumber + ", leadNumber=" + leadNumber + ", productCode="
				+ productCode + ", branchCode=" + branchCode + ", loanStatus=" + loanStatus + ", approvalDate="
				+ approvalDate + ", disbursalDate=" + disbursalDate + ", sourceSystemName=" + sourceSystemName
				+ ", customerName=" + customerName + ", customerId=" + customerId 
				+ ", mobileNumber=" + mobileNumber + "]";
	}

}
