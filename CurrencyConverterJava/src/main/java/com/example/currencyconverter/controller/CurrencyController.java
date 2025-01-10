package com.example.currencyconverter.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.currencyconverter.models.ConversionHistory;
import com.example.currencyconverter.service.CurrencyService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200/")
public class CurrencyController {

	@Autowired
	private CurrencyService currencyService;
	
	@GetMapping("/rates")
	public String fetchLatestRates()
	{
		currencyService.fetchAndSaveRates();
		return "Rates updated successfully";
	}
	@GetMapping("/fetchcurrency")
	public List<String> fetchCurrencyCodes()
	{
		return currencyService.getAllCurrencyCodes();
	}
	@GetMapping("/convert")
	public Double convertCurrency(@RequestParam String source,
									@RequestParam String destination,
									@RequestParam Double amount)
	{
		return currencyService.convertCurrency(source, destination, amount);
	}
	@GetMapping("/history")
	public List<ConversionHistory> getConversionHistory()
	{
		return currencyService.getConversionHistory();
	}
	@PostMapping("/history")
	public ConversionHistory saveConversion(@RequestBody ConversionHistory history)
	{
		return currencyService.saveConversion(history);
	}
	
}
