import secrets
# url = 'https://mydomain.com/reset=' + secrets.token_urlsafe()
# tokenByte16 = secrets.token_bytes(32)
# # print(url)
# # print(tokenByte16)
# # print(secrets.randbits(32))
myToken = secrets.token_urlsafe()
# myToken1 = secrets.token_urlsafe(128)
print(myToken)
print(secrets.token_bytes(64))
# print(myToken.__len__())
# print(myToken1)
# print(myToken1.__len__())

# cubes = [1,8,27,65,125]
# cubes[3] = 64
# print(cubes)
# python -Xutf8 manage.py dumpdata > data.json