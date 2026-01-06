import { Type } from '@google/genai';


const CreateUserFullDataToolSchema = {
  name: 'create_user_full_data',
  description: 'Create user with full data (name, email, phone)',
  parameters: {
    type: Type.OBJECT,
    properties: {
      name: {
        type: Type.STRING,
        description: 'Name of the user.',
      },
      email: {
        type: Type.STRING,
        description: 'Email of the user.',
      },
      phone: {
        type: Type.STRING,
        description: 'Phone of the user.',
      },
    },
    required: ['name', 'email', 'phone'],
  },
};

const CreateUserPartialDataToolSchema = {
    name: 'create_user_partial_data',
    description: 'Create user with partial data (email or phone or both is provided)',
    parameters: {
        type: Type.OBJECT,
        properties: {
            name: {
                type: Type.STRING,
                description: 'Name of the user.',
            },
            email: {
                type: Type.STRING,
                description: 'Email of the user.',
            },
            phone: {
                type: Type.STRING,
                description: 'Phone of the user.',
            },
        },
    },
}

const DeleteUserToolSchema = {
    name: 'delete_user',
    description: 'Delete user by MongoDB id',
    parameters: {
        type: Type.OBJECT,
        properties: {
            id: {
                type: Type.STRING,  
                description: 'Id of the user.',
            },
        },
        required: ['id'],
    },
}


const GetUserByEmailToolSchema = {
    name: 'get_user_by_email',
    description: 'Get user by email',
    parameters: {
        type: Type.OBJECT,
        properties: {
            email: {
                type: Type.STRING,
                description: 'Email of the user.',
            },
        },
        required: ['email'],
    },
}

const GetUserByPhoneToolSchema = {
    name: 'get_user_by_phone',
    description: 'Get user by phone',
    parameters: {
        type: Type.OBJECT,
        properties: {
            phone: {
                type: Type.STRING,
                description: 'Phone of the user.',
            },
        },
        required: ['phone'],
    },
}

export const toolsSchemas = [
    CreateUserFullDataToolSchema,
    CreateUserPartialDataToolSchema,
    DeleteUserToolSchema,
    GetUserByEmailToolSchema,
    GetUserByPhoneToolSchema,
];