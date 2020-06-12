# Login to your spotback account

**PROD-URL** : `/TBD/readOne`

**DEV-URL** : `/TBD/readOne`

**Method** : `GET`  

**JWT required** : Only for GET request

## Request

**Headers** :

* `Bearer: ${token}`
* `x-api-key: ${clientApiKey}`
* `spotback-correlation-id: ${uuid}`

**Params** :
for GET request

```key:value
{
coordinates:33.46374120382441,-111.92256882648348
range:1
}
```

## Success Response

**Condition** : If everything is OK.

**Code** : `200 SUCCESS`

**Content example** :
New jwt in header and user in body

**Headers** :
* `Bearer: ${token}`
```

## Error Responses

**Condition** : Request is either invalid or missing information.

**Code** : `400 INVALID REQUEST`

**Content example** :

```json
{
    "code":"INVALID REQUEST.",
    "message":"Description about the error"
}
```

**Condition** : Jwt token in the header is missing or invalid.

**Code** : `401 UNAUTHORIZED`

**Content example** :

```json
{
    "code":"UNAUTHORIZED.",
    "message":"Description about the error"
}
```

**Condition** : Encountered an error on in a backend system.

**Code** : `500 INTERNAL SERVER ERROR`

**Content example** :

```json
{
    "code":"INTERNAL SERVER ERROR.",
    "message":"Description about the error"
}
```

**Condition** : Encountered an error on in a backend system.

**Code** : `502 SERVICE TIMEOUT`

**Content example** :

```SERVICE TIMEOUT.```
