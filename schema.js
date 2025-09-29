const schema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "http://example.com/client_data.schema.json",
  "title": "Client Data",
  "description": "Schema for storing complex client information using reusable definitions.",
  "type": "object",
  "properties": {
    "clientId": {
      "description": "A unique identifier for the client, typically a UUID.",
      "type": "string",
      "pattern": "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$"
    },
    "profile": {
      "description": "Block containing the client's basic profile information.",
      "$ref": "#/definitions/profileSchema"
    },
    "contactInfo": {
      "description": "Block containing contact details for the client.",
      "$ref": "#/definitions/contactInfoSchema"
    },
    "marketing": {
      "description": "Block with marketing-related data.",
      "$ref": "#/definitions/marketingSchema"
    }
  },
  "required": [
    "clientId",
    "profile",
    "contactInfo"
  ],
  "definitions": {
    "profileSchema": {
      "type": "object",
      "properties": {
        "firstName": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        },
        "birthDate": {
          "description": "Client's date of birth in YYYY-MM-DD format.",
          "type": "string",
          "format": "date"
        },
        "jobTitle": {
          "description": "Client's current job title (optional).",
          "type": "string"
        }
      },
      "required": [
        "firstName",
        "lastName"
      ]
    },
    "contactInfoSchema": {
      "type": "object",
      "properties": {
        "email": {
          "description": "Client's primary email address.",
          "type": "string",
          "format": "email"
        },
        "phoneNumbers": {
          "description": "An array of phone numbers with their types.",
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "type": {
                "description": "The type of phone number.",
                "type": "string",
                "enum": [
                  "Home",
                  "Work",
                  "Mobile"
                ]
              },
              "number": {
                "description": "The phone number itself.",
                "type": "string",
                "pattern": "^\\+?[1-9]\\d{1,14}$"
              }
            },
            "required": [
              "type",
              "number"
            ]
          },
          "minItems": 1
        },
        "socialMedia": {
          "description": "An array of social media profile URLs (optional).",
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "required": [
        "email",
        "phoneNumbers"
      ]
    },
    "marketingSchema": {
      "type": "object",
      "properties": {
        "optInStatus": {
          "description": "Whether the client has opted into marketing communications.",
          "type": "boolean"
        },
        "subscribedCategories": {
          "description": "Categories of interest the client has subscribed to.",
          "type": "array",
          "items": {
            "type": "string"
          },
          "uniqueItems": true
        },
        "source": {
          "description": "How the client was acquired (e.g., 'Website', 'Referral').",
          "type": "string"
        }
      },
      "required": [
        "optInStatus"
      ]
    }
  }
}

