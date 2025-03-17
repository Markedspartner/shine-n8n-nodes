import type { INodeProperties } from 'n8n-workflow';

export const taskOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['task'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get a task',
				action: 'Get task',
			},
			{
				name: 'Get All',
				value: 'get-all',
				description: 'Get all tasks',
				action: 'Get all tasks',
			},
			{
				name: 'Run',
				value: 'run',
				description: 'Run task',
				action: 'Run task',
			},
		],
		default: 'get',
	},
];

export const taskFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                task:run/get                             */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'By',
		name: 'by',
		type: 'options',
		options: [
			{
				name: 'Task ID',
				value: 'id',
			}
		],
		required: true,
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['get', 'run'],
			},
		},
		default: 'id',
	}
];
