import * as handlers from '../tools/handlers';
import { IUser } from '../models/user.model';

// Type for all possible tool return values
type ToolResult = IUser | IUser[] | null;

// Tool function type with flexible args
type ToolFunction = (args: Record<string, unknown>) => Promise<ToolResult>;

export class ToolService {
    private toolMapping: Record<string, ToolFunction> = {
        'create_user_full_data': handlers.createUserFullDataTool as ToolFunction,
        'create_user_partial_data': handlers.createUserNotFullDataTool as ToolFunction,
        'update_user': handlers.updateUserTool as ToolFunction,
        'update_user_by_email': handlers.updateUserByEmailTool as ToolFunction,
        'update_user_by_phone': handlers.updateUserByPhoneTool as ToolFunction,
        'delete_user': handlers.deleteUserTool as ToolFunction,
        'delete_user_by_email': handlers.deleteUserByEmailTool as ToolFunction,
        'delete_user_by_phone': handlers.deleteUserByPhoneTool as ToolFunction,
        'get_user_by_name': handlers.getUserByNameTool as ToolFunction,
        'get_user_by_email': handlers.getUserByEmailTool as ToolFunction,
        'get_user_by_phone': handlers.getUserByPhoneTool as ToolFunction,
    };

    async executeTool(name: string, args: Record<string, unknown>): Promise<ToolResult> {
        const toolFunction = this.toolMapping[name];

        if (!toolFunction) {
            throw new Error(`Tool ${name} not found`);
        }

        return await toolFunction(args);
    }
}

export const toolService = new ToolService();
