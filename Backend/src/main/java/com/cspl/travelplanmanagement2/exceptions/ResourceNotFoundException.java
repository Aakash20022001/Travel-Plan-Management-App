package com.cspl.travelplanmanagement2.exceptions;

import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus
public class ResourceNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;
//	private static final long serialVersionUId=1L;

	public ResourceNotFoundException(String message) {
		super(message);
	}

}
