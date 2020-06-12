# Create your spotback account

**PROD-URL** : `/TBD/create`

**DEV-URL** : `http://localhost:8000/create`

**Method** : `POST`

## Request

**Headers** :
None

**Body** :
Required fields:

* firstName
* lastName
* email
* password

May contain the following fields
```json
{
  "firstName": "test5",
  "lastName": "test5",
  "email": "test5@test5.com",
  "password": "1234567890"
}
```

