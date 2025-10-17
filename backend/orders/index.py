'''
Business: Create and manage customer orders with database storage
Args: event - dict with httpMethod, body, queryStringParameters
      context - object with attributes: request_id, function_name
Returns: HTTP response with order data or list of orders
'''

import json
import os
import psycopg2
from datetime import datetime
from typing import Dict, Any, List

def generate_order_number() -> str:
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    return f'ORD-{timestamp}'

def get_db_connection():
    dsn = os.environ.get('DATABASE_URL')
    return psycopg2.connect(dsn)

def create_order(order_data: Dict[str, Any]) -> Dict[str, Any]:
    conn = get_db_connection()
    cur = conn.cursor()
    
    order_number = generate_order_number()
    
    cur.execute('''
        INSERT INTO orders (
            order_number, customer_name, customer_phone, customer_email,
            delivery_type, delivery_address, payment_type, total_amount, comment
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        RETURNING id, order_number, created_at
    ''', (
        order_number,
        order_data['name'],
        order_data['phone'],
        order_data.get('email', ''),
        order_data['delivery'],
        order_data['address'],
        order_data['payment'],
        order_data['totalAmount'],
        order_data.get('comment', '')
    ))
    
    order_id, order_number, created_at = cur.fetchone()
    
    for item in order_data['items']:
        cur.execute('''
            INSERT INTO order_items (
                order_id, product_id, product_name, product_price, quantity, total_price
            ) VALUES (%s, %s, %s, %s, %s, %s)
        ''', (
            order_id,
            item['id'],
            item['name'],
            item['price'],
            item['quantity'],
            item['price'] * item['quantity']
        ))
    
    conn.commit()
    cur.close()
    conn.close()
    
    return {
        'orderId': order_id,
        'orderNumber': order_number,
        'createdAt': created_at.isoformat()
    }

def get_orders(limit: int = 50) -> List[Dict[str, Any]]:
    conn = get_db_connection()
    cur = conn.cursor()
    
    cur.execute('''
        SELECT 
            id, order_number, customer_name, customer_phone, customer_email,
            delivery_type, delivery_address, payment_type, payment_status,
            order_status, total_amount, comment, created_at, updated_at
        FROM orders
        ORDER BY created_at DESC
        LIMIT %s
    ''', (limit,))
    
    orders = []
    for row in cur.fetchall():
        orders.append({
            'id': row[0],
            'orderNumber': row[1],
            'customerName': row[2],
            'customerPhone': row[3],
            'customerEmail': row[4],
            'deliveryType': row[5],
            'deliveryAddress': row[6],
            'paymentType': row[7],
            'paymentStatus': row[8],
            'orderStatus': row[9],
            'totalAmount': float(row[10]),
            'comment': row[11],
            'createdAt': row[12].isoformat(),
            'updatedAt': row[13].isoformat()
        })
    
    cur.close()
    conn.close()
    
    return orders

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
        result = create_order(body_data)
        
        return {
            'statusCode': 201,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps(result)
        }
    
    if method == 'GET':
        orders = get_orders()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'orders': orders})
        }
    
    return {
        'statusCode': 405,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'})
    }
