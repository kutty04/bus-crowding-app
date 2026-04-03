CREATE TABLE crowding_reports (
    id SERIAL PRIMARY KEY,
    bus_route VARCHAR(50) NOT NULL,
    crowding_level INTEGER NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    timestamp TIMESTAMP DEFAULT NOW()
);
