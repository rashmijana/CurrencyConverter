package com.example.currencyconverter.models;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
public class ConversionHistory {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String sourceCurrency;
    private Double sourceAmount;
    private String destinationCurrency;
    private Double destinationAmount;
    private Double rate;
    private String source;
    private String notes;
    private LocalDateTime conversionTime;
	public ConversionHistory() {
		super();
		// TODO Auto-generated constructor stub
	}
	public ConversionHistory(Long id, String sourceCurrency, Double sourceAmount, String destinationCurrency,
			Double destinationAmount, Double rate, String source, String notes, LocalDateTime conversionTime) {
		super();
		this.id = id;
		this.sourceCurrency = sourceCurrency;
		this.sourceAmount = sourceAmount;
		this.destinationCurrency = destinationCurrency;
		this.destinationAmount = destinationAmount;
		this.rate = rate;
		this.source = source;
		this.notes = notes;
		this.conversionTime = conversionTime;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getSourceCurrency() {
		return sourceCurrency;
	}
	public void setSourceCurrency(String sourceCurrency) {
		this.sourceCurrency = sourceCurrency;
	}
	public Double getSourceAmount() {
		return sourceAmount;
	}
	public void setSourceAmount(Double sourceAmount) {
		this.sourceAmount = sourceAmount;
	}
	public String getDestinationCurrency() {
		return destinationCurrency;
	}
	public void setDestinationCurrency(String destinationCurrency) {
		this.destinationCurrency = destinationCurrency;
	}
	public Double getDestinationAmount() {
		return destinationAmount;
	}
	public void setDestinationAmount(Double destinationAmount) {
		this.destinationAmount = destinationAmount;
	}
	public Double getRate() {
		return rate;
	}
	public void setRate(Double rate) {
		this.rate = rate;
	}
	public LocalDateTime getConversionTime() {
		return conversionTime;
	}
	public void setConversionTime(LocalDateTime conversionTime) {
		this.conversionTime = conversionTime;
	}
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}
	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
	}
    
}
