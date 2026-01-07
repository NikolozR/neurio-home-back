import { Type } from '@google/genai';


const CreateUserFullDataToolSchema = {
    name: 'create_user_full_data',
    description: 'Use this tool ONLY when you have collected ALL THREE required pieces of information: the user\'s Name, Email, AND Phone number. If any are missing, do not use this tool.',
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

    DeleteUserToolSchema,
    GetUserByEmailToolSchema,
    GetUserByPhoneToolSchema,
];