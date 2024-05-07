package com.projak.customwidget;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.security.MessageDigest;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class CripUtility {

	public CripUtility() {
		// TODO Auto-generated constructor stub
		
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		try{
			
			//log.info(s.replaceAll("\n\n", "\n"));
			
			//String min = String.valueOf(toNearestWholeMinute());
			//String min="22";
			//String encryPasswd = encryptStr("sysdev@456");
			//String encryPasswd = encryptStr("mit@1234");
			String encryPasswd = encryptStr("vnikyijohgvlakku");
			System.out.println("Encrypted password is (Line33) "+encryPasswd);
			
			
			//String min1=String.valueOf(toNearestWholeMinute());
			//String encryPasswd1 = encryptStr("X/24JCMamnSE1vBIiUezoQ==");
			//log.info("Encrypted password is "+encryPasswd1);
			String decryptPassword = decryptStr(encryPasswd);
			System.out.println("decryptPassword is "+decryptPassword);
			
		}catch(Exception e){
			System.out.println(e.getMessage());
			System.out.println(e.getStackTrace());
		}

	}
 

	private static byte[] encrypt(String message) throws Exception {
		final MessageDigest md = MessageDigest.getInstance("md5");
		final byte[] digestOfPassword = md.digest("HG58YZ3CR9".getBytes("utf-8"));
		final byte[] keyBytes = Arrays.copyOf(digestOfPassword, 24);
		for (int j = 0, k = 16; j < 8;) {
			keyBytes[k++] = keyBytes[j++];
		}

		final SecretKey key = new SecretKeySpec(keyBytes, "DESede");
		final IvParameterSpec iv = new IvParameterSpec(new byte[8]);
		final Cipher cipher = Cipher.getInstance("DESede/CBC/PKCS5Padding");
		cipher.init(Cipher.ENCRYPT_MODE, key, iv);

		final byte[] plainTextBytes = message.getBytes("utf-8");
		final byte[] cipherText = cipher.doFinal(plainTextBytes);
		return cipherText;
	}
	
	@SuppressWarnings("restriction")
	public static String encryptStr(String message) throws Exception {
		byte[] encryptedByte = CripUtility.encrypt(message);
		return new sun.misc.BASE64Encoder().encode(encryptedByte);
	}
	private static String decrypt(byte[] message) throws GeneralSecurityException, IOException {
		final MessageDigest md = MessageDigest.getInstance("md5");
		final byte[] digestOfPassword = md.digest("HG58YZ3CR9".getBytes("utf-8"));
		final byte[] keyBytes = Arrays.copyOf(digestOfPassword, 24);
		for (int j = 0, k = 16; j < 8;) {
			keyBytes[k++] = keyBytes[j++];
		}

		final SecretKey key = new SecretKeySpec(keyBytes, "DESede");
		final IvParameterSpec iv = new IvParameterSpec(new byte[8]);
		final Cipher decipher = Cipher.getInstance("DESede/CBC/PKCS5Padding");
		decipher.init(Cipher.DECRYPT_MODE, key, iv);

		final byte[] plainText = decipher.doFinal(message);
		return new String(plainText, "UTF-8");
	}

	// This Method is called to DeCrypt the Code
	public static String decryptStr(String message){
		try {
			@SuppressWarnings("restriction")
			byte[] decBtye = new sun.misc.BASE64Decoder().decodeBuffer(message);
			return decrypt(decBtye);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	
	 public static int toNearestWholeMinute() {
	        Calendar c = new GregorianCalendar();
	        //Date d = c.getTime();
	        Date d = new Date();
	        c.setTime(d);

	        if (c.get(Calendar.SECOND) >= 30)
	            c.add(Calendar.MINUTE, 1);

	        c.set(Calendar.SECOND, 0);

	        return c.get(Calendar.MINUTE);
	    }

	 static Date toNearestWholeHour(Date d) {
	        Calendar c = new GregorianCalendar();
	        c.setTime(d);

	        if (c.get(Calendar.MINUTE) >= 30)
	            c.add(Calendar.HOUR, 1);

	        c.set(Calendar.MINUTE, 0);
	        c.set(Calendar.SECOND, 0);

	        return c.getTime();
	    }
}
