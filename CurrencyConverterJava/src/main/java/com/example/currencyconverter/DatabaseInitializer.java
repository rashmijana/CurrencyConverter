package com.example.currencyconverter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

import java.sql.*;

import javax.sql.DataSource;

@Component
public class DatabaseInitializer {

    private final JdbcTemplate jdbcTemplate;

    @Value("${spring.datasource.url}")
    private String dbUrl;

    public DatabaseInitializer(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }
    @PostConstruct
    public void initializeDatabase() {
    	try (Connection connection = jdbcTemplate.getDataSource().getConnection()) {
            // Check if the database exists
            Statement statement = connection.createStatement();
            String checkDbSql = "SELECT 1 FROM pg_database WHERE datname = 'currency_db';";
            var rs = statement.executeQuery(checkDbSql);

            if (!rs.next()) {
                // If the database does not exist, create it
                String createDbSql = "CREATE DATABASE currency_db";
                statement.executeUpdate(createDbSql);
                System.out.println("Database 'currency_db' created successfully.");
            } else {
                System.out.println("Database 'currency_db' already exists.");
            }
        } catch (SQLException e) {
            System.err.println("Error during database initialization: " + e.getMessage());
        }
    }
}
