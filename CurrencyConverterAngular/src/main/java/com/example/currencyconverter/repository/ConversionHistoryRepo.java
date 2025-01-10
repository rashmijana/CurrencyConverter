package com.example.currencyconverter.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.currencyconverter.models.ConversionHistory;

public interface ConversionHistoryRepo extends JpaRepository<ConversionHistory, Long>{

}
