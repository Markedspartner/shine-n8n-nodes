import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import {taskFields, taskOperations} from "./TaskDescription";

export class ShineAiNode implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Shine AI',
		name: 'shineAiNode',
		group: ['transform'],
		version: 1,
		subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
		description: 'Shine AI',
		defaults: {
			name: 'Shine AI',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'shineAICredentialsApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.shine-ai.markedspartner.no',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Task',
						value: 'task',
					}
				],
				default: 'task',
			},


			...taskOperations,
			...taskFields,

		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const credentials = await this.getCredentials('shineAICredentialsApi');
		const baseURL = 'https://api.shine-ai.markedspartner.no';

		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;
				let responseData;

				if (resource === 'task') {
					if (operation === 'get') {
						const taskId = this.getNodeParameter('by', i) as string;
						responseData = await this.helpers.request({
							method: 'GET',
							url: `${baseURL}/tasks/${taskId}`,
							headers: {
								Authorization: `Bearer ${credentials.accessToken}`,
							},
							json: true,
						});
					} else if (operation === 'get-all') {
						responseData = await this.helpers.request({
							method: 'GET',
							url: `${baseURL}/tasks`,
							headers: {
								Authorization: `Bearer ${credentials.accessToken}`,
							},
							json: true,
						});
					} else if (operation === 'run') {
						const taskId = this.getNodeParameter('by', i) as string;
						responseData = await this.helpers.request({
							method: 'POST',
							url: `${baseURL}/tasks/${taskId}/run`,
							headers: {
								Authorization: `Bearer ${credentials.accessToken}`,
							},
							json: true,
						});
					} else {
						throw new NodeOperationError(this.getNode(), `Operation ${operation} is not supported.`);
					}
				}

				returnData.push({ json: responseData });
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: error.message } });
				} else {
					throw new NodeOperationError(this.getNode(), error, { itemIndex: i });
				}
			}
		}

		return [returnData];
	}
}
