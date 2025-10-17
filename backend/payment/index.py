'''
Business: Process payments through YooKassa payment gateway
Args: event - dict with httpMethod, body for creating payment or checking status
      context - object with attributes: request_id, function_name
Returns: HTTP response with payment URL or payment status
'''

import json
import os
import uuid
from typing import Dict, Any
import requests
from base64 import b64encode

def get_yookassa_auth():
    shop_id = os.environ.get('YOOKASSA_SHOP_ID', '')
    secret_key = os.environ.get('YOOKASSA_SECRET_KEY', '')
    credentials = f'{shop_id}:{secret_key}'
    encoded = b64encode(credentials.encode()).decode()
    return f'Basic {encoded}'

def create_payment(amount: float, order_number: str, description: str) -> Dict[str, Any]:
    url = 'https://api.yookassa.ru/v3/payments'
    
    headers = {
        'Authorization': get_yookassa_auth(),
        'Idempotence-Key': str(uuid.uuid4()),
        'Content-Type': 'application/json'
    }
    
    data = {
        'amount': {
            'value': f'{amount:.2f}',
            'currency': 'RUB'
        },
        'confirmation': {
            'type': 'redirect',
            'return_url': 'https://yoursite.com/payment-success'
        },
        'capture': True,
        'description': description,
        'metadata': {
            'order_number': order_number
        }
    }
    
    response = requests.post(url, headers=headers, json=data)
    result = response.json()
    
    return {
        'paymentId': result.get('id'),
        'status': result.get('status'),
        'confirmationUrl': result.get('confirmation', {}).get('confirmation_url')
    }

def check_payment_status(payment_id: str) -> Dict[str, Any]:
    url = f'https://api.yookassa.ru/v3/payments/{payment_id}'
    
    headers = {
        'Authorization': get_yookassa_auth(),
        'Content-Type': 'application/json'
    }
    
    response = requests.get(url, headers=headers)
    result = response.json()
    
    return {
        'paymentId': result.get('id'),
        'status': result.get('status'),
        'paid': result.get('paid', False),
        'amount': result.get('amount', {}).get('value')
    }

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        
        result = create_payment(
            amount=body_data['amount'],
            order_number=body_data['orderNumber'],
            description=body_data.get('description', 'Оплата заказа')
        )
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps(result)
        }
    
    if method == 'GET':
        params = event.get('queryStringParameters', {})
        payment_id = params.get('paymentId', '')
        
        if not payment_id:
            return {
                'statusCode': 400,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'paymentId is required'})
            }
        
        result = check_payment_status(payment_id)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps(result)
        }
    
    return {
        'statusCode': 405,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'})
    }
