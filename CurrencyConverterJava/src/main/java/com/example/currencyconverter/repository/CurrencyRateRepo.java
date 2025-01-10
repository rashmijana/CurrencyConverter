package com.example.currencyconverter.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.currencyconverter.models.CurrencyRates;

public interface CurrencyRateRepo extends JpaRepository<CurrencyRates, Long> {

	CurrencyRates findByCurrencyCode(String currencyCode);
}
