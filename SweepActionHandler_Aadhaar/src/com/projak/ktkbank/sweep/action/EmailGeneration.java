package com.projak.ktkbank.sweep.action;

import java.io.File;
import java.io.IOException;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import com.filenet.api.engine.HandlerCallContext;


public class EmailGeneration {

	public Boolean sendEmail(String filePath, HandlerCallContext hcc) {
		
		hcc.traceDetail("Entering SweepHandlerEmailGeneration.onSweep");
		System.out.println("Entering SweepHandlerEmailGeneration.onSweep");
		String[] to = {"ritvikrao@rediffmail.com", "ritvik.durgavarjhula@projakinfotech.com"};
        String from = "ritvikdurgavarjhula103@gmail.com";
        
        Properties properties = System.getProperties();
        properties.put("mail.smtp.host", "smtp.gmail.com");
        properties.put("mail.smtp.port", "465");
        properties.put("mail.smtp.ssl.enable", "true");
        properties.put("mail.smtp.auth", "true");
        
        Session session = Session.getInstance(properties, new javax.mail.Authenticator() {
        	protected PasswordAuthentication getPasswordAuthentication() {
        		return new PasswordAuthentication("ritvikdurgavarjhula103@gmail.com", 
        				"tvqj xqcq cqon hlex");
        	}
        });
        
        hcc.traceDetail("Email Session Created SweepHandlerEmailGeneration.onSweep");
        System.out.println("Email Session Created SweepHandlerEmailGeneration.onSweep");
        
        try {
            	
        	MimeMessage message = new MimeMessage(session);
        	message.setFrom(new InternetAddress(from));
        	for (int i=0; i<to.length; i++){
        		message.addRecipient(Message.RecipientType.TO, new InternetAddress(to[i]));
            }
        	message.setSubject("Reports for Aadhaar Masking");
        	Multipart multipart = new MimeMultipart();
        	MimeBodyPart attachmentPart = new MimeBodyPart();
        	MimeBodyPart textPart = new MimeBodyPart();

            try {
            	File file =new File(filePath);
                attachmentPart.attachFile(file);
                textPart.setText("Please verify the attachment for report");
                multipart.addBodyPart(textPart);
                multipart.addBodyPart(attachmentPart);

            } catch (IOException e) {
            	hcc.traceDetail("IO Exception in SweepJob Email Generation"+e.getMessage());
            	System.out.println("IO Exception in SweepJob Email Generation"+e.getMessage());
                e.printStackTrace();
            }
            
            message.setContent(multipart);
            hcc.traceDetail("Sending email..... SweepHandlerEmailGeneration.onSweep");
            System.out.println("Sending email..... SweepHandlerEmailGeneration.onSweep");
            Transport.send(message);
            hcc.traceDetail("Email sent..... SweepHandlerEmailGeneration.onSweep");
            System.out.println("Email sent..... SweepHandlerEmailGeneration.onSweep");
            return true;
            
        } catch (MessagingException mex) {
        	hcc.traceDetail("MessagingException during Email..... SweepHandlerEmailGeneration.onSweep"+mex.getLocalizedMessage());
        	System.out.println("MessagingException during Email..... SweepHandlerEmailGeneration.onSweep"+mex.getLocalizedMessage());
            mex.printStackTrace();
            return false;
        } catch (Exception e) {
        	hcc.traceDetail("Exception during Email..... SweepHandlerEmailGeneration.onSweep"+e.getLocalizedMessage());
        	System.out.println("Exception during Email..... SweepHandlerEmailGeneration.onSweep"+e.getLocalizedMessage());
            e.printStackTrace();
            return false;
        }
	}

}
