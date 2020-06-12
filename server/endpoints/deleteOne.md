# Delete your spotback account

**PROD-URL** : `/TBD/deleteSpot`

**DEV-URL** : `/TBD/deleteSpot`

**Method** : `POST`

**JWT required** : YES

## Request

**Headers** :

* `x-api-key: ${clientApiKey}`
* `Bearer: ${token}`
* `spotback-correlation-id: ${uuid}`

## Success Response

**Condition** : If everything is OK.

**Code** : `200 SUCCESS`

**Body** :
Required fields:

* coordinates
* leaveTime

May contain the following fields
```json
{
"coordinates":"33.46374120382441,-111.92256882648348",
"range":"1"
}
```


**Content example** :

```json
{
    "code": "SUCCESS.",
    "message": "All spots have been deleted"
}
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
