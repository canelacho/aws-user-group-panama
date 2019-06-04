// Own Cert https
// 1. Generate RSA key. In the Terminal enter
// openssl genrsa -out meetupweb.key
// The meetupweb.key file will be generated.
// 2. Create a certificate signing request (CSR) for an SSL certificate. Answer the questions
// openssl req -new -key meetupweb.key -days 3650 -out meetupweb.csr
// Country Name (2 letter code) [AU]:UK
// State or Province Name (full name) [Some-State]:Surrey
// Locality Name (eg, city) []:Guildford
// Organization Name (eg, company) [Internet Widgits Pty Ltd]:Mock Server Ltd
// Organizational Unit Name (eg, section) []:mockdept
// Common Name (e.g. server FQDN or YOUR name) []:meetupweb.com
// Email Address []:admin@meetupweb.com
// A challenge password []: <Enter>
// An optional company name []: <Enter>
// An .csr file will be created.
// 3. Create the certificate from the certificate request
// openssl x509 -req -days 3650 -in meetupweb.csr -signkey meetupweb.key -out meetupweb.crt
// Signature ok
// subject=/C=UK/ST=Surrey/L=Guildford/O=Mock Server Ltd/OU=mockdept/CN=capitalysweb.com/emailAddress=admin@mockserver.com
// Getting Private key

'use strict'

const fs = require('fs')

module.exports = {
  key : fs.readFileSync('./src/private/meetupweb.key'),
  cert : fs.readFileSync('./src/private/meetupweb.crt')
}