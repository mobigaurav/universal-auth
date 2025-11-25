import json
import os
import boto3
from botocore.exceptions import ClientError

cognito = boto3.client('cognito-idp')

def create_response(status_code, body):
    return {
        'statusCode': status_code,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'OPTIONS,POST'
        },
        'body': json.dumps(body)
    }

def login_handler(event, context):
    try:
        body = json.loads(event['body'])
        email = body['email']
        password = body['password']
        
        # Authenticate user
        auth_response = cognito.initiate_auth(
            AuthFlow='USER_PASSWORD_AUTH',
            ClientId=os.environ['USER_POOL_CLIENT_ID'],
            AuthParameters={
                'USERNAME': email,
                'PASSWORD': password
            }
        )
        
        # Get user info
        user_info = cognito.admin_get_user(
            UserPoolId=os.environ['USER_POOL_ID'],
            Username=email
        )
        
        # Extract user attributes
        attributes = {attr['Name']: attr['Value'] for attr in user_info['UserAttributes']}
        
        # Use preferred_username to store persona as a workaround
        persona = None
        preferred_username = attributes.get('preferred_username', '')
        if preferred_username.startswith('seller:') or preferred_username.startswith('buyer:'):
            persona = preferred_username.split(':')[0]
        
        user = {
            'id': user_info['Username'],
            'email': attributes.get('email'),
            'emailVerified': attributes.get('email_verified') == 'true',
            'createdAt': user_info['UserCreateDate'].isoformat(),
            'persona': persona
        }
        
        return create_response(200, {
            'user': user,
            'token': auth_response['AuthenticationResult']['AccessToken']
        })
        
    except ClientError as e:
        return create_response(400, {'message': str(e)})
    except Exception as e:
        return create_response(500, {'message': 'Internal server error'})

def register_handler(event, context):
    try:
        body = json.loads(event['body'])
        email = body['email']
        password = body['password']
        username = body.get('username')
        persona = body.get('persona')
        
        user_attributes = [{'Name': 'email', 'Value': email}]
        
        # Use preferred_username to store persona as workaround
        if persona and username:
            preferred_username = f"{persona}:{username}"
        elif persona:
            preferred_username = f"{persona}:{email.split('@')[0]}"
        elif username:
            preferred_username = username
        else:
            preferred_username = email.split('@')[0]
            
        user_attributes.append({'Name': 'preferred_username', 'Value': preferred_username})
        
        cognito.sign_up(
            ClientId=os.environ['USER_POOL_CLIENT_ID'],
            Username=email,
            Password=password,
            UserAttributes=user_attributes
        )
        
        return create_response(200, {
            'message': 'User registered successfully. Please check your email for verification.'
        })
        
    except ClientError as e:
        return create_response(400, {'message': str(e)})
    except Exception as e:
        return create_response(500, {'message': 'Internal server error'})

def reset_password_handler(event, context):
    try:
        body = json.loads(event['body'])
        email = body['email']
        new_password = body['newPassword']
        confirmation_code = body['confirmationCode']
        
        cognito.confirm_forgot_password(
            ClientId=os.environ['USER_POOL_CLIENT_ID'],
            Username=email,
            Password=new_password,
            ConfirmationCode=confirmation_code
        )
        
        return create_response(200, {'message': 'Password reset successfully'})
        
    except ClientError as e:
        return create_response(400, {'message': str(e)})
    except Exception as e:
        return create_response(500, {'message': 'Internal server error'})

def verify_email_handler(event, context):
    try:
        body = json.loads(event['body'])
        email = body['email']
        verification_code = body['verificationCode']
        
        cognito.confirm_sign_up(
            ClientId=os.environ['USER_POOL_CLIENT_ID'],
            Username=email,
            ConfirmationCode=verification_code
        )
        
        return create_response(200, {'message': 'Email verified successfully'})
        
    except ClientError as e:
        return create_response(400, {'message': str(e)})
    except Exception as e:
        return create_response(500, {'message': 'Internal server error'})

def resend_verification_handler(event, context):
    try:
        body = json.loads(event['body'])
        email = body['email']
        
        cognito.resend_confirmation_code(
            ClientId=os.environ['USER_POOL_CLIENT_ID'],
            Username=email
        )
        
        return create_response(200, {'message': 'Verification code sent successfully'})
        
    except ClientError as e:
        return create_response(400, {'message': str(e)})
    except Exception as e:
        return create_response(500, {'message': 'Internal server error'})