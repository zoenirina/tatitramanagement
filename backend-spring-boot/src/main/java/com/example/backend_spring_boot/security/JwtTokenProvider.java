package com.example.backend_spring_boot.security;

import java.util.Date;
import java.util.List;

import com.auth0.jwt.exceptions.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.stream.Collectors;

//import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

@Component
public class JwtTokenProvider
{
	@Value("${SECRET_KEY}")
	private String SECRET_KEY;

	@Value("${MINUTES_TIL_EXPIRE}")
	private int MINUTES_UNTIL_EXPIRATION;

	private static final Logger LOGGER = LoggerFactory.getLogger(JwtTokenProvider.class);

	public boolean validateToken(String token) {
		try {
			DecodedJWT jwt = JWT.require(getAlgorithm())
					.build()
					.verify(token);

			// Vérifie que le token n'est pas expiré
			Date expiration = jwt.getExpiresAt();
			if (expiration != null && expiration.before(new Date())) {
				LOGGER.error("Expired JWT token");
				return false;
			}

			return true;
		} catch (TokenExpiredException ex) {
			LOGGER.error("Expired JWT token", ex);
		} catch (AlgorithmMismatchException ex) {
			LOGGER.error("JWT algorithm mismatch", ex);
		} catch (SignatureVerificationException ex) {
			LOGGER.error("Invalid JWT signature", ex);
		} catch (JWTDecodeException ex) {
			LOGGER.error("Invalid JWT token format", ex);
		} catch (JWTVerificationException ex) {
			LOGGER.error("JWT verification failed", ex);
		} catch (IllegalArgumentException ex) {
			LOGGER.error("JWT token is null or empty", ex);
		}

		return false;
	}

	private Algorithm getAlgorithm()
	{
		return Algorithm.HMAC256(SECRET_KEY);
	}

//	public String generateToken(UserDetails userDetails)
//	{
//		return JWT.create()
//				.withSubject(userDetails.getUsername())
//				.withClaim("roles", userDetails.getAuthorities()
//						.stream().map(GrantedAuthority::getAuthority)
//						.collect(Collectors.joining(",")))
//				.withIssuedAt(new Date())
//				.withExpiresAt(new Date(System.currentTimeMillis() + (1000 * 60 * MINUTES_UNTIL_EXPIRATION)))
//				.sign(getAlgorithm());
//	}

	public String generateToken(UserPrincipal userPrincipal) {
		return JWT.create()
				.withSubject(String.valueOf(userPrincipal.getId())) // 👈 ID comme subject
				.withClaim("roles", userPrincipal.getAuthorities()
						.stream().map(GrantedAuthority::getAuthority)
						.collect(Collectors.toList())) // 👈 garde ça en liste
				.withIssuedAt(new Date())
				.withExpiresAt(new Date(System.currentTimeMillis() + (1000 * 60 * MINUTES_UNTIL_EXPIRATION)))
				.sign(getAlgorithm());
	}

	public Long getUserIdFromJWT(String token) {
		DecodedJWT decodedJWT = JWT.require(getAlgorithm())
				.build()
				.verify(token);

		return Long.parseLong(decodedJWT.getSubject());
	}

//	public Long getUserIdFromJWT(String token) {
//		DecodedJWT decodedJWT = JWT.require(getAlgorithm())
//				.build()
//				.verify(token);
//
//		return decodedJWT.getClaim("id").asLong();
//	}


	public String extractUsername(String token)
	{
		return JWT.require(getAlgorithm())
				.build().verify(token)
				.getSubject();
	}

	public List<String> extractRoles(String token)
	{
		return JWT.require(getAlgorithm())
				.build().verify(token)
				.getClaim("roles").asList(String.class);
	}

//	public boolean validateToken(String token)
//	{
//		try
//		{
//			DecodedJWT jwt = JWT.require(getAlgorithm()).build().verify(token);
//			return(jwt.getSubject().equals(username) && jwt.getExpiresAt().after(new Date()));
//		}
//		catch(JWTVerificationException j)
//		{
//			return false;
//		}
//	}
}

//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.ExpiredJwtException;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.MalformedJwtException;
//import io.jsonwebtoken.SignatureAlgorithm;
//import io.jsonwebtoken.SignatureException;
//import io.jsonwebtoken.UnsupportedJwtException;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.stereotype.Component;
//
//import java.util.Date;
//
//import java.security.Key;
//import java.util.Date;
//import java.util.stream.Collectors;
//
//@Component
//public class JwtTokenProvider {
//	private static final Logger LOGGER = LoggerFactory.getLogger(JwtTokenProvider.class);
//
//	@Value(value = "${app.jwtSecret}")
//	private String jwtSecret;
//
//	@Value(value = "${app.jwtExpirationInMs}")
//	private int jwtExpirationInMs;
//
////	public String generateToken(Authentication authentication) {
////		UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
////
////		Date now = new Date();
////		Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);
////
////		return Jwts.builder()
////				.setSubject(Long.toString(userPrincipal.getId()))
////				.setIssuedAt(new Date())
////				.setExpiration(expiryDate)
////				.signWith(SignatureAlgorithm.HS512, jwtSecret)
////				.compact();
////	}
//
//	public String generateToken(UserDetails userDetails)
//	{
//		return JWT.create()
//				.withSubject(userDetails.getUsername())
//				.withClaim("roles", userDetails.getAuthorities()
//						.stream().map(GrantedAuthority::getAuthority)
//						.collect(Collectors.joining(",")))
//				.withIssuedAt(new Date())
//				.withExpiresAt(new Date(System.currentTimeMillis() + (1000 * 60 * MINUTES_UNTIL_EXPIRATION)))
//				.sign(getAlgorithm());
//	}
//
//	public Long getUserIdFromJWT(String token) {
//		Claims claims = Jwts.parser()
//				.setSigningKey(jwtSecret)
//				.parseClaimsJws(token)
//				.getBody();
//
//		return Long.valueOf(claims.getSubject());
//	}
//
//	public boolean validateToken(String authToken) {
//		try {
//			Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
//			return true;
//		} catch (SignatureException ex) {
//			LOGGER.error("Invalid JWT signature");
//		} catch (MalformedJwtException ex) {
//			LOGGER.error("Invalid JWT token");
//		} catch (ExpiredJwtException ex) {
//			LOGGER.error("Expired JWT token");
//		} catch (UnsupportedJwtException ex) {
//			LOGGER.error("Unsupported JWT token");
//		} catch (IllegalArgumentException ex) {
//			LOGGER.error("JWT claims string is empty");
//		}
//		return false;
//	}
//}
