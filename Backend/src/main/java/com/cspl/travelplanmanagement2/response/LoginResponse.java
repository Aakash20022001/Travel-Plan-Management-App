package com.cspl.travelplanmanagement2.response;

import com.cspl.travelplanmanagement2.Dto.UserDTO;

public class LoginResponse {

	String message;
	Boolean status;
	private UserDTO user;
	private String token;

	public LoginResponse() {

	}

	public LoginResponse(String message, Boolean status, UserDTO user, String token) {
		super();
		this.message = message;
		this.status = status;
		this.user = user;
		this.token = token;
	}

	public UserDTO getUser() {
		return user;
	}

	public void setUser(UserDTO user) {
		this.user = user;
	}

	public LoginResponse(String message, Boolean status) {
		super();
		this.message = message;
		this.status = status;
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

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	@Override
	public String toString() {
		return "LoginResponse [message=" + message + ", status=" + status + "]";
	}

}
