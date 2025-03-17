import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ShineAICredentialsApi implements ICredentialType {
	name = 'shineAICredentialsApi';
	displayName = 'Shine AI Credentials API';
	documentationUrl = "https://shine-ai.markedspartner.no/";
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
		{
			displayName: 'Domain',
			name: 'domain',
			type: 'string',
			default: 'https://api.shine-ai.markedspartner.no',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-API-KEY': '={{$credentials.apiKey}}'
			}

		},
	};
	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials?.domain}}',
			url: '/assistants',
		},
	};
}
