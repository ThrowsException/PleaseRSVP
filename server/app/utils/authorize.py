import json
import os

from aiohttp import web
import jwt
import uuid


def authorize(request):
    """
    Check aws jwt
    """

    print(os.getenv("ENV"))
    if os.getenv("ENV") == "dev":
        request["user_id"] = uuid.uuid4()
        return

    keys = request.app["cognito_keys"]
    authorization_header = request.headers["Authorization"]
    token = authorization_header.split(" ")[1]

    headers = jwt.get_unverified_header(token)
    kid = headers["kid"]
    # search for the kid in the downloaded public keys
    key_index = -1
    for i in range(len(keys)):
        if kid == keys[i]["kid"]:
            key_index = i
            break
    if key_index == -1:
        raise web.HTTPUnauthorized()

    # construct the public key
    public_key = jwt.algorithms.RSAAlgorithm.from_jwk(json.dumps(keys[key_index]))
    try:
        decoded = jwt.decode(
            token, public_key, algorithm="RS256", audience="5doe311sg57aocpmnnh773m9vr"
        )
    except jwt.exceptions.PyJWTError:
        raise web.HTTPUnauthorized()

    user_id = decoded["cognito:username"]
    request["user_id"] = user_id
