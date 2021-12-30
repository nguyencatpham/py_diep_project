import secrets
url = 'https://mydomain.com/reset=' + secrets.token_urlsafe()
tokenByte16 = secrets.token_bytes(32)
# print(url)
# print(tokenByte16)
# print(secrets.randbits(32))
myToken = secrets.token_urlsafe() + secrets.token_urlsafe() + secrets.token_urlsafe()
print(myToken)
print(myToken.__len__())