'''
Business: Send email notifications for new orders to admin and customers
Args: event - dict with httpMethod, body containing order details
      context - object with attributes: request_id, function_name
Returns: HTTP response confirming email was sent
'''

import json
import os
from typing import Dict, Any
import requests

def send_email_via_sendgrid(to_email: str, subject: str, html_content: str) -> bool:
    api_key = os.environ.get('EMAIL_API_KEY', '')
    
    if not api_key:
        return False
    
    url = 'https://api.sendgrid.com/v3/mail/send'
    
    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json'
    }
    
    data = {
        'personalizations': [{
            'to': [{'email': to_email}]
        }],
        'from': {'email': 'orders@yourstore.com', 'name': 'Ваш Магазин'},
        'subject': subject,
        'content': [{
            'type': 'text/html',
            'value': html_content
        }]
    }
    
    response = requests.post(url, headers=headers, json=data)
    return response.status_code == 202

def format_order_email(order_data: Dict[str, Any], is_admin: bool = False) -> str:
    items_html = ''
    for item in order_data.get('items', []):
        items_html += f'''
        <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">{item['name']}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">{item['quantity']} шт.</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">{item['price']:,.0f} ₽</td>
        </tr>
        '''
    
    greeting = 'Новый заказ!' if is_admin else f'Здравствуйте, {order_data["name"]}!'
    
    html = f'''
    <html>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">{greeting}</h2>
        <p>Заказ <strong>№{order_data["orderNumber"]}</strong> успешно оформлен.</p>
        
        <h3>Детали заказа:</h3>
        <table style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr style="background: #f5f5f5;">
                    <th style="padding: 10px; text-align: left;">Товар</th>
                    <th style="padding: 10px; text-align: center;">Количество</th>
                    <th style="padding: 10px; text-align: right;">Цена</th>
                </tr>
            </thead>
            <tbody>
                {items_html}
            </tbody>
        </table>
        
        <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 5px;">
            <p><strong>Итого:</strong> {order_data['totalAmount']:,.0f} ₽</p>
            <p><strong>Доставка:</strong> {order_data['delivery']}</p>
            <p><strong>Адрес:</strong> {order_data['address']}</p>
            <p><strong>Телефон:</strong> {order_data['phone']}</p>
        </div>
        
        <p style="margin-top: 20px; color: #666;">Спасибо за покупку!</p>
    </body>
    </html>
    '''
    
    return html

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        
        admin_email = os.environ.get('ADMIN_EMAIL', '')
        customer_email = body_data.get('email', '')
        
        subject = f'Заказ №{body_data["orderNumber"]}'
        
        admin_sent = False
        customer_sent = False
        
        if admin_email:
            admin_html = format_order_email(body_data, is_admin=True)
            admin_sent = send_email_via_sendgrid(admin_email, f'Новый {subject}', admin_html)
        
        if customer_email:
            customer_html = format_order_email(body_data, is_admin=False)
            customer_sent = send_email_via_sendgrid(customer_email, subject, customer_html)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'success': True,
                'adminNotified': admin_sent,
                'customerNotified': customer_sent
            })
        }
    
    return {
        'statusCode': 405,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'})
    }
