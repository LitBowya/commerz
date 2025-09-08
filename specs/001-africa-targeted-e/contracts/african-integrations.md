# Mobile Money Integration Contracts

## M-Pesa Integration Contract

### Endpoint: POST /payments/mpesa/stk-push

**Purpose**: Initiate M-Pesa STK Push payment

**Request Schema**:

```json
{
  "type": "object",
  "required": [
    "phone_number",
    "amount",
    "account_reference",
    "transaction_desc"
  ],
  "properties": {
    "phone_number": {
      "type": "string",
      "pattern": "^254[0-9]{9}$",
      "description": "Kenyan mobile number in format 254XXXXXXXXX"
    },
    "amount": {
      "type": "number",
      "minimum": 1,
      "maximum": 70000,
      "description": "Amount in KES"
    },
    "account_reference": {
      "type": "string",
      "maxLength": 12,
      "description": "Order or invoice number"
    },
    "transaction_desc": {
      "type": "string",
      "maxLength": 13,
      "description": "Description of transaction"
    },
    "callback_url": {
      "type": "string",
      "format": "uri",
      "description": "URL for payment status callback"
    }
  }
}
```

**Response Schema**:

```json
{
  "type": "object",
  "required": [
    "merchant_request_id",
    "checkout_request_id",
    "response_code",
    "response_description"
  ],
  "properties": {
    "merchant_request_id": {
      "type": "string",
      "description": "Unique request ID from M-Pesa"
    },
    "checkout_request_id": {
      "type": "string",
      "description": "Used to query transaction status"
    },
    "response_code": {
      "type": "string",
      "enum": ["0", "1"],
      "description": "0 = Success, 1 = Error"
    },
    "response_description": {
      "type": "string",
      "description": "Response message"
    },
    "customer_message": {
      "type": "string",
      "description": "Message to display to customer"
    }
  }
}
```

### Endpoint: POST /payments/mpesa/query-status

**Purpose**: Query M-Pesa transaction status

**Request Schema**:

```json
{
  "type": "object",
  "required": ["checkout_request_id"],
  "properties": {
    "checkout_request_id": {
      "type": "string",
      "description": "Checkout request ID from STK push response"
    }
  }
}
```

**Response Schema**:

```json
{
  "type": "object",
  "required": ["response_code", "response_description", "result_code"],
  "properties": {
    "response_code": {
      "type": "string"
    },
    "response_description": {
      "type": "string"
    },
    "merchant_request_id": {
      "type": "string"
    },
    "checkout_request_id": {
      "type": "string"
    },
    "result_code": {
      "type": "string",
      "enum": ["0", "1032", "1037", "2001"],
      "description": "0=Success, 1032=Cancelled, 1037=Timeout, 2001=Insufficient funds"
    },
    "result_desc": {
      "type": "string"
    },
    "amount": {
      "type": "number"
    },
    "mpesa_receipt_number": {
      "type": "string",
      "description": "M-Pesa transaction ID"
    },
    "transaction_date": {
      "type": "string",
      "format": "date-time"
    },
    "phone_number": {
      "type": "string"
    }
  }
}
```

## MTN MoMo Integration Contract

### Endpoint: POST /payments/mtn-momo/request-to-pay

**Purpose**: Initiate MTN Mobile Money payment

**Request Schema**:

```json
{
  "type": "object",
  "required": [
    "amount",
    "currency",
    "external_id",
    "payer",
    "payer_message",
    "payee_note"
  ],
  "properties": {
    "amount": {
      "type": "string",
      "pattern": "^[0-9]+\\.?[0-9]*$",
      "description": "Amount to charge"
    },
    "currency": {
      "type": "string",
      "enum": ["UGX", "GHS", "XAF", "ZMW"],
      "description": "Currency code"
    },
    "external_id": {
      "type": "string",
      "description": "External reference ID"
    },
    "payer": {
      "type": "object",
      "required": ["party_id_type", "party_id"],
      "properties": {
        "party_id_type": {
          "type": "string",
          "enum": ["MSISDN"]
        },
        "party_id": {
          "type": "string",
          "description": "Phone number without country code"
        }
      }
    },
    "payer_message": {
      "type": "string",
      "maxLength": 160,
      "description": "Message to payer"
    },
    "payee_note": {
      "type": "string",
      "maxLength": 160,
      "description": "Note for payee"
    }
  }
}
```

**Response Schema**:

```json
{
  "type": "object",
  "required": ["reference_id", "status"],
  "properties": {
    "reference_id": {
      "type": "string",
      "format": "uuid",
      "description": "Transaction reference ID"
    },
    "status": {
      "type": "string",
      "enum": ["PENDING", "SUCCESSFUL", "FAILED"],
      "description": "Transaction status"
    }
  }
}
```

## Airtel Money Integration Contract

### Endpoint: POST /payments/airtel-money/request

**Purpose**: Initiate Airtel Money payment

**Request Schema**:

```json
{
  "type": "object",
  "required": ["reference", "subscriber", "transaction"],
  "properties": {
    "reference": {
      "type": "string",
      "description": "Unique transaction reference"
    },
    "subscriber": {
      "type": "object",
      "required": ["country", "currency", "msisdn"],
      "properties": {
        "country": {
          "type": "string",
          "enum": [
            "KE",
            "UG",
            "TZ",
            "RW",
            "ZM",
            "MW",
            "MG",
            "NG",
            "GA",
            "NE",
            "TD",
            "CM"
          ],
          "description": "Country code"
        },
        "currency": {
          "type": "string",
          "enum": [
            "KES",
            "UGX",
            "TZS",
            "RWF",
            "ZMW",
            "MWK",
            "MGA",
            "NGN",
            "XAF"
          ],
          "description": "Currency code"
        },
        "msisdn": {
          "type": "string",
          "description": "Customer mobile number"
        }
      }
    },
    "transaction": {
      "type": "object",
      "required": ["amount", "id"],
      "properties": {
        "amount": {
          "type": "number",
          "minimum": 1,
          "description": "Transaction amount"
        },
        "id": {
          "type": "string",
          "description": "Transaction ID"
        }
      }
    }
  }
}
```

**Response Schema**:

```json
{
  "type": "object",
  "required": ["status", "data"],
  "properties": {
    "status": {
      "type": "object",
      "required": [
        "response_code",
        "code",
        "success",
        "result_code",
        "message"
      ],
      "properties": {
        "response_code": {
          "type": "string"
        },
        "code": {
          "type": "string"
        },
        "success": {
          "type": "boolean"
        },
        "result_code": {
          "type": "string"
        },
        "message": {
          "type": "string"
        }
      }
    },
    "data": {
      "type": "object",
      "properties": {
        "transaction": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "status": {
              "type": "string",
              "enum": ["TIP", "TF", "TS", "TA", "TR"]
            }
          }
        }
      }
    }
  }
}
```

## WhatsApp Business API Integration Contract

### Endpoint: POST /integrations/whatsapp/send-message

**Purpose**: Send order notifications via WhatsApp

**Request Schema**:

```json
{
  "type": "object",
  "required": ["to", "type", "template"],
  "properties": {
    "messaging_product": {
      "type": "string",
      "enum": ["whatsapp"]
    },
    "to": {
      "type": "string",
      "pattern": "^[1-9][0-9]{7,14}$",
      "description": "Phone number in international format without +"
    },
    "type": {
      "type": "string",
      "enum": ["template", "text"]
    },
    "template": {
      "type": "object",
      "required": ["name", "language"],
      "properties": {
        "name": {
          "type": "string",
          "enum": [
            "order_confirmation",
            "payment_reminder",
            "shipping_update",
            "delivery_notification"
          ]
        },
        "language": {
          "type": "object",
          "required": ["code"],
          "properties": {
            "code": {
              "type": "string",
              "enum": ["en", "sw", "am", "ha", "fr", "ar", "pt"]
            }
          }
        },
        "components": {
          "type": "array",
          "items": {
            "type": "object",
            "required": ["type", "parameters"],
            "properties": {
              "type": {
                "type": "string",
                "enum": ["header", "body", "button"]
              },
              "parameters": {
                "type": "array",
                "items": {
                  "type": "object",
                  "required": ["type", "text"],
                  "properties": {
                    "type": {
                      "type": "string",
                      "enum": ["text", "currency", "date_time"]
                    },
                    "text": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

**Response Schema**:

```json
{
  "type": "object",
  "required": ["messaging_product", "contacts", "messages"],
  "properties": {
    "messaging_product": {
      "type": "string",
      "enum": ["whatsapp"]
    },
    "contacts": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "input": {
            "type": "string"
          },
          "wa_id": {
            "type": "string"
          }
        }
      }
    },
    "messages": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string"
          },
          "message_status": {
            "type": "string",
            "enum": ["accepted", "failed"]
          }
        }
      }
    }
  }
}
```

## AI Content Generation Contract

### Endpoint: POST /ai/generate-product-description

**Purpose**: Generate product descriptions using AI

**Request Schema**:

```json
{
  "type": "object",
  "required": [
    "product_title",
    "product_type",
    "target_language",
    "target_market"
  ],
  "properties": {
    "product_title": {
      "type": "string",
      "maxLength": 200
    },
    "product_type": {
      "type": "string",
      "examples": ["fashion", "electronics", "crafts", "food", "beauty"]
    },
    "key_features": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "maxItems": 10
    },
    "target_language": {
      "type": "string",
      "enum": ["en", "sw", "am", "ha", "fr", "ar", "pt", "zu", "yo", "ig"]
    },
    "target_market": {
      "type": "string",
      "enum": [
        "NG",
        "KE",
        "ZA",
        "GH",
        "UG",
        "TZ",
        "RW",
        "ET",
        "SN",
        "CI",
        "MA",
        "EG"
      ]
    },
    "tone": {
      "type": "string",
      "enum": ["professional", "casual", "persuasive", "informative"],
      "default": "professional"
    },
    "cultural_context": {
      "type": "object",
      "properties": {
        "season": {
          "type": "string",
          "enum": [
            "dry_season",
            "rainy_season",
            "harvest_time",
            "festival_period"
          ]
        },
        "local_preferences": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    }
  }
}
```

**Response Schema**:

```json
{
  "type": "object",
  "required": [
    "description",
    "short_description",
    "language",
    "confidence_score"
  ],
  "properties": {
    "description": {
      "type": "string",
      "description": "Full product description"
    },
    "short_description": {
      "type": "string",
      "maxLength": 500,
      "description": "Brief product summary"
    },
    "seo_title": {
      "type": "string",
      "maxLength": 60
    },
    "seo_description": {
      "type": "string",
      "maxLength": 160
    },
    "suggested_tags": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "maxItems": 10
    },
    "language": {
      "type": "string"
    },
    "confidence_score": {
      "type": "number",
      "minimum": 0,
      "maximum": 1,
      "description": "AI confidence in generated content quality"
    },
    "cultural_relevance": {
      "type": "object",
      "properties": {
        "market_fit": {
          "type": "number",
          "minimum": 0,
          "maximum": 1
        },
        "seasonal_relevance": {
          "type": "boolean"
        },
        "local_terms_used": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    }
  }
}
```

## Shipping Integration Contract

### Endpoint: POST /shipping/calculate-rates

**Purpose**: Calculate shipping rates for African logistics partners

**Request Schema**:

```json
{
  "type": "object",
  "required": ["origin", "destination", "package"],
  "properties": {
    "origin": {
      "type": "object",
      "required": ["country_code", "city"],
      "properties": {
        "country_code": {
          "type": "string",
          "pattern": "^[A-Z]{2}$"
        },
        "city": {
          "type": "string"
        },
        "postal_code": {
          "type": "string"
        }
      }
    },
    "destination": {
      "type": "object",
      "required": ["country_code", "city"],
      "properties": {
        "country_code": {
          "type": "string",
          "pattern": "^[A-Z]{2}$"
        },
        "city": {
          "type": "string"
        },
        "postal_code": {
          "type": "string"
        },
        "is_rural": {
          "type": "boolean",
          "default": false
        }
      }
    },
    "package": {
      "type": "object",
      "required": ["weight", "dimensions"],
      "properties": {
        "weight": {
          "type": "number",
          "minimum": 0.1,
          "description": "Weight in kilograms"
        },
        "dimensions": {
          "type": "object",
          "required": ["length", "width", "height"],
          "properties": {
            "length": {
              "type": "number",
              "minimum": 1
            },
            "width": {
              "type": "number",
              "minimum": 1
            },
            "height": {
              "type": "number",
              "minimum": 1
            }
          }
        },
        "value": {
          "type": "number",
          "minimum": 0,
          "description": "Package value for insurance"
        }
      }
    },
    "service_types": {
      "type": "array",
      "items": {
        "type": "string",
        "enum": ["standard", "express", "overnight", "economy"]
      }
    }
  }
}
```

**Response Schema**:

```json
{
  "type": "object",
  "required": ["rates", "currency"],
  "properties": {
    "rates": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["carrier", "service_type", "cost", "delivery_days"],
        "properties": {
          "carrier": {
            "type": "string",
            "examples": ["DHL", "Aramex", "Local Courier", "PostNet"]
          },
          "service_type": {
            "type": "string",
            "enum": ["standard", "express", "overnight", "economy"]
          },
          "cost": {
            "type": "number",
            "minimum": 0
          },
          "delivery_days": {
            "type": "object",
            "properties": {
              "min": {
                "type": "integer",
                "minimum": 1
              },
              "max": {
                "type": "integer",
                "minimum": 1
              }
            }
          },
          "tracking_available": {
            "type": "boolean"
          },
          "insurance_included": {
            "type": "boolean"
          },
          "cash_on_delivery": {
            "type": "boolean"
          },
          "rural_delivery": {
            "type": "boolean"
          }
        }
      }
    },
    "currency": {
      "type": "string",
      "pattern": "^[A-Z]{3}$"
    },
    "estimated_delivery_date": {
      "type": "string",
      "format": "date"
    },
    "restrictions": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Any shipping restrictions or special requirements"
    }
  }
}
```
