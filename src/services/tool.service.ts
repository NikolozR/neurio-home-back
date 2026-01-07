import { userService } from './user.service';

export class ToolService {
    private toolMapping: Record<string, Function> = {
        'create_user_full_data': userService.createUserFullData.bind(userService),
        'create_user_partial_data': userService.createUserNotFullData.bind(userService),
        'delete_user': userService.deleteUser.bind(userService),
        'get_user_by_email': userService.getUserByEmail.bind(userService),
        'get_user_by_phone': userService.getUserByPhone.bind(userService),
    };

    async executeTool(name: string, args: any): Promise<any> {
        const toolFunction = this.toolMapping[name];

        if (!toolFunction) {
            throw new Error(`Tool ${name} not found`);
        }

        return await toolFunction(args);
    }
}

export const toolService = new ToolService();
