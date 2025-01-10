### Json Web Token (JWT)

## What is jwt

- Its an encrypted token
 - claim securely between twp parties
 - Take data then encrypt it then jwt decide who can decrypt it
 - Example -
  ```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 ```


## 3 Components of JWT

- algorithm
- type
- payload

```
{
  "alg": "HS256", // algorithm type
  "typ": "JWT" // type
}

// payload data
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022  // define expire time
}

```



 ## Type of algorithm
 - HS256    
HS256 (HMAC with SHA-256) is a symmetric keyed hashing algorithm that uses one secret key. Symmetric means two parties share the secret key. The key is used for both generating the signature and validating it.
 - HS384
 HS256/HS384/HS512 (HMAC with SHA-256/SHA-384/SHA-512): These are symmetric encryption algorithms that use HMAC (Hash-based Message Authentication Code) combined with SHA-2 hash functions.
 - HS-512
 HS512 (HMAC with SHA-512): This is the highest level of security in the HMAC family, using a 512-bit key size for maximum protection against brute-force attacks. 4. RS256 (RSA with SHA-256): This is an asymmetric algorithm that uses a public-private key pair for signing and verification.
 




## public cryptography
The public key decrypt with my private key


## private key cryptography

key will be private


## stateless

- the key not sorted in db

## stateful

- The key stored in db