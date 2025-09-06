FROM eclipse-temurin:22 AS build
WORKDIR /app
COPY . .

# Installe Maven manuellement car eclipse-temurin:22 n’a pas Maven préinstallé
RUN mvn clean package -DskipTests

# Étape 2 : Image légère pour exécution
FROM eclipse-temurin:22-jre
WORKDIR /app
#COPY --from=build /app/target/*.jar app.jar
#ARG JAR_FILE=target/*.jar
EXPOSE 8080
COPY ./target/backend-spring-boot-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]