![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# Shine Workflows Nodes

Custom n8n nodes for the Shine platform, providing workflow automation capabilities through n8n.

## Technology Stack

- **Language**: TypeScript 5
- **Platform**: n8n
- **Development**: TypeScript compiler with watch mode
- **Testing**: Jest

## Features

- Custom nodes for Shine services integration
- Automated data enrichment workflows
- BRREG data synchronization nodes
- AI/ML processing nodes
- Data transformation nodes

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the nodes:
   ```bash
   npm run build
   ```

3. Link to n8n:
   ```bash
   npm link
   cd ~/.n8n/custom
   npm link @shine/workflow-nodes
   ```

## Development

1. Start development mode:
   ```bash
   npm run dev
   ```

2. Run tests:
   ```bash
   npm test
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Available Nodes

### Shine Enrich Nodes
- **ShineEnrichCompany**: Enrich company data
- **ShineEnrichContact**: Enrich contact data
- **ShineEnrichValidate**: Validate enriched data

### BRREG Sync Nodes
- **BrregFetch**: Fetch company data from BRREG
- **BrregTransform**: Transform BRREG data
- **BrregSync**: Synchronize with BigQuery

### Shine AI Nodes
- **ShineAIClassify**: Text classification
- **ShineAIEntity**: Entity recognition
- **ShineAISentiment**: Sentiment analysis

## Node Development

### Creating a New Node

1. Create a new directory under `nodes/`:
   ```
   nodes/
   └── MyNewNode/
       ├── MyNewNode.node.ts
       └── MyNewNode.test.ts
   ```

2. Implement the node interface:
   ```typescript
   import { INodeType, INodeTypeDescription } from 'n8n-workflow';

   export class MyNewNode implements INodeType {
     description: INodeTypeDescription = {
       displayName: 'My New Node',
       name: 'myNewNode',
       group: ['shine'],
       version: 1,
       description: 'Handle my new functionality',
       defaults: {
         name: 'My New Node',
       },
       inputs: ['main'],
       outputs: ['main'],
       properties: [
         // Node properties
       ],
     };

     async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
       // Node execution logic
     }
   }
   ```

### Testing Nodes

1. Write tests using Jest:
   ```typescript
   import { MyNewNode } from './MyNewNode.node';

   describe('MyNewNode', () => {
     it('should process data correctly', async () => {
       // Test implementation
     });
   });
   ```

2. Run tests:
   ```bash
   npm test
   ```

## Architecture

The package follows a modular architecture:

```
shine-workflows-nodes/
├── src/
│   ├── nodes/          # Node implementations
│   ├── shared/         # Shared utilities
│   │   ├── api/        # API clients
│   │   └── types/      # Type definitions
│   └── utils/          # Helper functions
├── tests/              # Test files
├── tsconfig.json       # TypeScript configuration
└── package.json        # Package configuration
```

## n8n Integration

The nodes are designed to work seamlessly with n8n:

1. **Node Registration**: Nodes are automatically registered with n8n
2. **Credentials**: Secure credential management through n8n
3. **Error Handling**: Consistent error handling and retries
4. **Data Flow**: Standard n8n data flow patterns

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests
4. Submit a pull request

### Development Guidelines

- Follow TypeScript best practices
- Write comprehensive tests
- Document all node properties
- Include usage examples
- Follow n8n node development guidelines

## License

[Your License Here]
