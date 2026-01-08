import { Type } from '@google/genai';

/**
 * User-related tool schemas for Gemini function calling
 */

export const CreateUserFullDataToolSchema = {
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

export const UpdateUserToolSchema = {
  name: 'update_user',
  description: 'Update user by MongoDB id. Only use this if you already have the user\'s MongoDB _id.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      id: {
        type: Type.STRING,
        description: 'MongoDB _id of the user.',
      },
      name: {
        type: Type.STRING,
        description: 'New name of the user (optional).',
      },
      email: {
        type: Type.STRING,
        description: 'New email of the user (optional).',
      },
      phone: {
        type: Type.STRING,
        description: 'New phone of the user (optional).',
      },
    },
    required: ['id'],
  },
};

export const UpdateUserByEmailToolSchema = {
  name: 'update_user_by_email',
  description: 'Update user by their email address. You can update their name and/or phone number.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      email: {
        type: Type.STRING,
        description: 'Current email of the user to update.',
      },
      name: {
        type: Type.STRING,
        description: 'New name of the user (optional).',
      },
      phone: {
        type: Type.STRING,
        description: 'New phone of the user (optional).',
      },
    },
    required: ['email'],
  },
};

export const UpdateUserByPhoneToolSchema = {
  name: 'update_user_by_phone',
  description: 'Update user by their phone number. You can update their name and/or email.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      phone: {
        type: Type.STRING,
        description: 'Current phone of the user to update.',
      },
      name: {
        type: Type.STRING,
        description: 'New name of the user (optional).',
      },
      email: {
        type: Type.STRING,
        description: 'New email of the user (optional).',
      },
    },
    required: ['phone'],
  },
};

export const DeleteUserToolSchema = {
  name: 'delete_user',
  description: 'Delete user by MongoDB id. Only use this if you already have the user\'s MongoDB _id.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      id: {
        type: Type.STRING,
        description: 'MongoDB _id of the user.',
      },
    },
    required: ['id'],
  },
};

export const DeleteUserByEmailToolSchema = {
  name: 'delete_user_by_email',
  description: 'Delete user by email address. Use this when the user asks to delete by email.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      email: {
        type: Type.STRING,
        description: 'Email of the user to delete.',
      },
    },
    required: ['email'],
  },
};

export const DeleteUserByPhoneToolSchema = {
  name: 'delete_user_by_phone',
  description: 'Delete user by phone number. Use this when the user asks to delete by phone.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      phone: {
        type: Type.STRING,
        description: 'Phone number of the user to delete.',
      },
    },
    required: ['phone'],
  },
};

export const GetUserByNameToolSchema = {
  name: 'get_user_by_name',
  description: 'Get user(s) by name. Returns all users matching the name (case-insensitive).',
  parameters: {
    type: Type.OBJECT,
    properties: {
      name: {
        type: Type.STRING,
        description: 'Name of the user to search for.',
      },
    },
    required: ['name'],
  },
};

export const GetUserByEmailToolSchema = {
  name: 'get_user_by_email',
  description: 'Get user by email. Returns a single user or null.',
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
};

export const GetUserByPhoneToolSchema = {
  name: 'get_user_by_phone',
  description: 'Get user by phone number. Returns a single user or null.',
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
};

