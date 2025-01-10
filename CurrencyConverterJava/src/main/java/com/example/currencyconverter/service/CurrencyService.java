package com.example.currencyconverter.service;

import java.util.List;

import com.example.currencyconverter.models.ConversionHistory;

public interface CurrencyService {

	void fetchAndSaveRates();
	List<String> getAllCurrencyCodes();
	Double convertCurrency(String sourceCurrency, String destinationCurrency, double amount);
	List<ConversionHistory> getConversionHistory();
	ConversionHistory saveConversion(ConversionHistory history);
	
}
