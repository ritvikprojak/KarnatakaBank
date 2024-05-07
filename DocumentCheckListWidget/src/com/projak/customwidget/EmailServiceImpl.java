package com.projak.customwidget;



import java.util.Properties;

import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;




public class EmailServiceImpl {
	
	Properties mailServerProperties;
	Session getMailSession;
	MimeMessage generateMailMessage;
	//ResourceBundleClass rBC = new ResourceBundleClass();
	//final ResourceBundle resourceBundle = rBC.getResourceBundle();
	DBUtil dbUtil=new DBUtil();
	Properties rBProps = dbUtil.getProperties();
	String toList = rBProps.getProperty("tomail");
	
	String emailGreetingStr = rBProps.getProperty("emailGreetingStr");
	String emailBodyString = rBProps.getProperty("emailBodyString"); 
	String emailSignature = rBProps.getProperty("emailSignature");
	String fromEmailHostServer = rBProps.getProperty("fromEmailHostServer"); 
	String fromEmailHostPort = rBProps.getProperty("fromEmailHostPort"); 
	String fromEmailId = rBProps.getProperty("fromEmailId");
	String fromEmailPassword = rBProps.getProperty("fromEmailPassword"); 
	String ccEmailId = rBProps.getProperty("ccEmailId"); 

	
public static void main(String[] args) throws Exception {
	EmailServiceImpl email=new EmailServiceImpl();
	try {
		email.generateAndSendEmail("Email","","","");
	} catch (AddressException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	} catch (MessagingException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
}


public String generateAndSendEmail(String Subject, String comments,String toEmail,String lar) throws Exception {

	mailServerProperties = System.getProperties();
	mailServerProperties.put("mail.smtp.port", fromEmailHostPort); 
	mailServerProperties.put("mail.smtp.auth", "true");
	mailServerProperties.put("mail.smtp.ssl.enable", "true");
	mailServerProperties.put("mail.smtp.starttls.enable", "true");
	
	toList=toList+","+toEmail;
	
	getMailSession = Session.getDefaultInstance(mailServerProperties, null);
	generateMailMessage = new MimeMessage(getMailSession);
	generateMailMessage.addRecipients(Message.RecipientType.TO, InternetAddress.parse(toList));
	generateMailMessage.addRecipients(Message.RecipientType.CC, InternetAddress.parse(ccEmailId));
	//generateMailMessage.addRecipients(Message.RecipientType.BCC, InternetAddress.parse(bCCList));
	
	
	// For Customized Subject from config.properties File Use variable String : subjectStr
	generateMailMessage.setSubject(Subject+":"+lar); 
	
	String emailBody = 	
						emailGreetingStr+"<br><br>"+
						"<font size='5'>"+
						"</font>"+
						"<b>Comments :  <br> "+comments+"</b>"+
						"<br><br> Regards, <br>"+emailSignature+
						"<br><br><i>This is a System Generated Mail</i>";
	
	Multipart multipart = new MimeMultipart();
	// Adding Email Body
	BodyPart messageBodyPart = new MimeBodyPart();
    messageBodyPart.setContent(emailBody, "text/html");
    multipart.addBodyPart(messageBodyPart);
	System.out.println("Mail Session has been created successfully..");

	
	boolean flag = false;
	
	if(flag){
		generateMailMessage.setContent(emailBody, "text/html"); 
	}else{
		generateMailMessage.setContent(multipart);
	}
	
	Transport transport = getMailSession.getTransport("smtp");

	
	transport.connect(fromEmailHostServer, fromEmailId,"");
	transport.sendMessage(generateMailMessage, generateMailMessage.getAllRecipients() );
	transport.close();
	String isMailSentMsg = "Mail notification has been sent To: "+toList+"";
	return isMailSentMsg;
	}
}