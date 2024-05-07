package com.projak.ktkbank.event.action.exception;

import com.filenet.api.exception.ExceptionCode;

public class DuplicateFolderException extends RuntimeException{
	
	public DuplicateFolderException(String ErrorMessage){
		super(ErrorMessage);
	}
	
}
