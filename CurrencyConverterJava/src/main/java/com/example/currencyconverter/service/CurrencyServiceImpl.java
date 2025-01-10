package com.example.currencyconverter.service;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.xml.parsers.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.w3c.dom.*;

import com.example.currencyconverter.models.ConversionHistory;
import com.example.currencyconverter.models.CurrencyRates;
import com.example.currencyconverter.repository.ConversionHistoryRepo;
import com.example.currencyconverter.repository.CurrencyRateRepo;

@Service
public class CurrencyServiceImpl implements CurrencyService{

	@Autowired
	private CurrencyRateRepo rateRepo;
	
	@Autowired
	private ConversionHistoryRepo historyRepo;
	
	@Override
	public void fetchAndSaveRates() {
		String url="https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml";
		String xmlData=fetchCurrencyData(url);
		if(xmlData != null)
		{
			Map<String, Double> exchangeRates=parseCurrencyData(xmlData);
			saveCurrencyRates(exchangeRates);
		}
	}
	@Scheduled(fixedRate = 600000)  // fixedRate is in milliseconds (600000ms = 10 minutes)
    public void scheduleFetchRates() {
        fetchAndSaveRates();
    }
	private String fetchCurrencyData(String url) {
		RestTemplate restTemplate=new RestTemplate();
		return restTemplate.getForObject(url,String.class);
	}
	private Map<String, Double> parseCurrencyData(String xmlData) {
		Map<String,Double> exchangeRates=new HashMap<>();
		
		try {
			InputStream inputStream=new ByteArrayInputStream(xmlData.getBytes(StandardCharsets.UTF_8));
			
			DocumentBuilderFactory factory=DocumentBuilderFactory.newInstance();
			DocumentBuilder builder=factory.newDocumentBuilder();
			Document document=builder.parse(inputStream);
			
			document.getDocumentElement().normalize();
			
			NodeList cubeList=document.getElementsByTagName("Cube");
			for(int i=0;i<cubeList.getLength();i++)
			{
				Node node=cubeList.item(i);
				if(node.getNodeType()==Node.ELEMENT_NODE)
				{
					Element element=(Element) node;
					if(element.hasAttribute("currency") && element.hasAttribute("rate"))
					{
						String currency=element.getAttribute("currency");
						String rate=element.getAttribute("rate");
						exchangeRates.put(currency, Double.valueOf(rate));
					}
				}
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return exchangeRates;
	}
	private void saveCurrencyRates(Map<String, Double> exchangeRates) {
        exchangeRates.forEach((currency, rate) -> {

        	CurrencyRates existingRate = rateRepo.findByCurrencyCode(currency);
            
            if (existingRate != null) {
                existingRate.setRate(rate);  // update existing rate
                rateRepo.save(existingRate);
            } else {
                CurrencyRates currencyRate = new CurrencyRates();
                currencyRate.setCurrencyCode(currency);
                currencyRate.setRate(rate);
                rateRepo.save(currencyRate);
            }
        });
    }
	@Override
	public Double convertCurrency(String sourceCurrency, String destinationCurrency, double amount) {
		CurrencyRates sourceRate= rateRepo.findByCurrencyCode(sourceCurrency);
		CurrencyRates destinationRate=rateRepo.findByCurrencyCode(destinationCurrency);
		if(sourceRate==null || destinationRate==null)
		{
			throw new RuntimeException("Currency not found");
		}
		double rate=destinationRate.getRate() / sourceRate.getRate();
		double convertedAmount= amount * rate;
		
		ConversionHistory history=new ConversionHistory();
		history.setSourceCurrency(sourceCurrency);
        history.setSourceAmount(amount);
        history.setDestinationCurrency(destinationCurrency);
        history.setDestinationAmount(convertedAmount);
        history.setRate(rate);
        history.setSource("ECB");
        history.setNotes("notes");
        saveConversion(history);
        
        BigDecimal roundedAmount=new BigDecimal(convertedAmount).setScale(2,RoundingMode.HALF_UP);
		return roundedAmount.doubleValue();
	}

	@Override
	public List<ConversionHistory> getConversionHistory() {
		return historyRepo.findAll();
	}

	@Override
	public ConversionHistory saveConversion(ConversionHistory history) {
		history.setConversionTime(LocalDateTime.now());
		return historyRepo.save(history);
	}
	@Override
	public List<String> getAllCurrencyCodes() {
		
		return rateRepo.findAll().stream().map(CurrencyRates::getCurrencyCode)
							.collect(Collectors.toList());
	}
	

}
