package com.cspl.travelplanmanagement2.response;

import com.cspl.travelplanmanagement2.Dto.UserDTO;

public class LoginResponse {

	String message;
	Boolean status;
	private UserDTO user;

	public LoginResponse() {

	}

	public LoginResponse(String message, Boolean status, UserDTO user) {
		super();
		this.message = message;
		this.status = status;
		this.user = user;
	}

	public UserDTO getUser() {
		return user;
	}

	public void setUser(UserDTO user) {
		this.user = user;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "LoginResponse [message=" + message + ", status=" + status + "]";
	}

}
