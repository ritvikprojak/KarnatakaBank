package com.projak.ktkbank.event.action.exception;

import org.apache.chemistry.opencmis.commons.exceptions.CmisBaseException;
import org.apache.chemistry.opencmis.commons.exceptions.CmisConstraintException;
import org.apache.chemistry.opencmis.commons.exceptions.CmisRuntimeException;

import com.filenet.api.exception.EngineRuntimeException;

public class FolderAlreadyExistsException extends EngineRuntimeException{

	public FolderAlreadyExistsException(String ErrorMessage){
		super();
	}
}
