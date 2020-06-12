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
	"firstName": "newuser123",
	"lastName": "newuser123",
	"email": "newuser123@gmail.com",
	"password": "1234567890"
}
```

