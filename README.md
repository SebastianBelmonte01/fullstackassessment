# Full Stack Application (Spring Boot + React + PostgreSQL)

This project is a **fullstack application** composed of:

- **Backend:** Spring Boot (Java 17)
- **Frontend:** React
- **Database:** PostgreSQL
- **NoSQL:** MongoDB (for logs)
- **Containerization:** Docker & Docker Compose

## Environment Variables
### Backend configuration (application.properties)

```
spring.application.name=${SPRING_APPLICATION_NAME:fseabackend}
spring.datasource.url=${SPRING_DATASOURCE_URL}
spring.datasource.username=${SPRING_DATASOURCE_USERNAME}
spring.datasource.password=${SPRING_DATASOURCE_PASSWORD}
spring.datasource.driver-class-name=${SPRING_DATASOURCE_DRIVER_CLASS_NAME}

spring.jpa.database-platform=${SPRING_JPA_DATABASE_PLATFORM}
spring.jpa.hibernate.ddl-auto=${SPRING_JPA_HIBERNATE_DDL_AUTO}
spring.jpa.show-sql=${SPRING_JPA_SHOW_SQL}
spring.jpa.properties.hibernate.format_sql=${SPRING_JPA_PROPERTIES_HIBERNATE_FORMAT_SQL}

jwt.secret=${JWT_SECRET}
jwt.issuer=${JWT_ISSUER}
jwt.expiration=${JWT_EXPIRATION}

spring.mongodb.uri=${SPRING_MONGODB_URI}
```

### Backend .env file example (needs to have the real secrets)

```
SPRING_APPLICATION_NAME=fseabackend

SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/fsea_db
SPRING_DATASOURCE_USERNAME=fsea_user
SPRING_DATASOURCE_PASSWORD=secret123
SPRING_DATASOURCE_DRIVER_CLASS_NAME=org.postgresql.Driver

SPRING_JPA_DATABASE_PLATFORM=org.hibernate.dialect.PostgreSQLDialect
SPRING_JPA_HIBERNATE_DDL_AUTO=update
SPRING_JPA_SHOW_SQL=true
SPRING_JPA_PROPERTIES_HIBERNATE_FORMAT_SQL=true

JWT_SECRET=very_secure_secret_key_123456
JWT_ISSUER=finconecta
JWT_EXPIRATION=3600000

SPRING_MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/logsdb
```

## Build
### Build Backend

```
cd fseabackend
mvn clean package -DskipTests
```

### Build Frontend

```
cd fseafrontend
npm install
npm run build
```
### Run Application
```
docker compose build
docker compose up -d
```


