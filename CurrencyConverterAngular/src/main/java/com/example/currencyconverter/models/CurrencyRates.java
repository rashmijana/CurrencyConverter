package com.example.currencyconverter.models;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
public class CurrencyRates {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;
    private String currencyCode;
    private Double rate;
    private LocalDateTime timestamp;
    
    
	public CurrencyRates() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public CurrencyRates(long id, LocalDateTime timestamp, Double rate, String currencyCode) {
		super();
		this.id = id;
		this.timestamp = timestamp;
		this.rate = rate;
		this.currencyCode = currencyCode;
	}

	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getCurrencyCode() {
		return currencyCode;
	}
	public void setCurrencyCode(String currencyCode) {
		this.currencyCode = currencyCode;
	}
	public Double getRate() {
		return rate;
	}
	public void setRate(Double rate) {
		this.rate = rate;
	}
	public LocalDateTime getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}
    
}
