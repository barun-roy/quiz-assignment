# quiz-assignment

## Entry Point

- server runs from server.js and app.js contains middlewares, error handlers and routing
- folder structure is divided into model, controllers and routes
- common folder contains common functions
- middleware folder for authentication
- sample env file provided
- to start the server in development mode:
```  yarn install  ```
```  yarn run start:dev  ```

## Functionality

### User
- user create api to create users in the database
```
{
			"name": "user/create",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"firstName\": \"Jane\",\r\n    \"lastName\":\"Doe\",\r\n    \"email\": \"janeDoe@example.com\",\r\n    \"password\": \"password\",\r\n    \"userImage\": \"profile_images/jane_smith.jpg\",\r\n    \"isAdmin\": false\r\n  }",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": "http://localhost:4001/api/v1/user/create"
			},
			"response": []
		}
```
- user login api with jwt authentication, checks for existing user, password check and jwt verification
```
{
			"name": "user/login",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"email\":\"janeDoe@example.com\",\r\n    \"password\":\"password\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": "http://localhost:4001/api/v1/user/login"
			},
			"response": []
		}
```
- user profile view api so user can view their details
  ```
  {
			"name": "user/profile",
			"request": {
				"auth": {
					"type": "bearer",
					"bearer": {
						"token": ""
					}
				},
				"method": "GET",
				"header": [
					{
						"key": "Authorization",
						"value": "Bearer yyy",
						"type": "text",
						"disabled": true
					}
				],
				"url": "http://localhost:4001/api/v1/user/profile"
			},
			"response": []
		}
  ```
- user profile update api so user can update their profile along with profile image update
```
{
			"name": "user/updateProfile",
			"request": {
				"auth": {
					"type": "bearer",
					"bearer": {
						"token": ""
					}
				},
				"method": "POST",
				"header": [],
				"body": {
					"mode": "formdata",
					"formdata": [
						{
							"key": "firstName",
							"value": "Jane",
							"type": "text",
							"disabled": true
						},
						{
							"key": "lastName",
							"value": "Smith2",
							"type": "text",
							"disabled": true
						},
						{
							"key": "email",
							"value": "abc@email.com",
							"type": "text",
							"disabled": true
						},
						{
							"key": "userImage",
							"type": "file",
							"src": "User-Profile-PNG-Image.png"
						}
					]
				},
				"url": "http://localhost:4001/api/v1/user/updateProfile"
			},
			"response": []
		}
```

### Category
- get all category api to fetch all the categories from the database
```
{
			"name": "category/getAll",
			"request": {
				"auth": {
					"type": "bearer",
					"bearer": {
						"token": ""
					}
				},
				"method": "GET",
				"header": [],
				"url": "http://localhost:4001/api/v1/category/getAll"
			},
			"response": []
		}
```
- get question based on respective categories, questions having multiple categories is handled
```
{
			"name": "category/questions/",
			"request": {
				"auth": {
					"type": "bearer",
					"bearer": {
						"token": ""
					}
				},
				"method": "GET",
				"header": [],
				"url": "http://localhost:4001/api/v1/category/questions/"
			},
			"response": []
		}
```

### Question
- bulk upload questions api to import questions in bulk from csv file into the database
```
{
			"name": "bulk Upload Questions",
			"request": {
				"auth": {
					"type": "bearer",
					"bearer": {
						"token": ""
					}
				},
				"method": "POST",
				"header": [],
				"body": {
					"mode": "formdata",
					"formdata": [
						{
							"key": "csvFile",
							"type": "file",
							"src": "questions2.csv"
						}
					]
				},
				"url": "http://localhost:4001/api/v1/question/bulkUploadQuestions"
			},
			"response": []
		}
```
- sample csv file provided
