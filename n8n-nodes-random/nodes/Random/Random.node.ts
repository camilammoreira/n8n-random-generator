import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  IHttpRequestOptions,
  NodeOperationError,
} from "n8n-workflow";

export class Random implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Random",
    name: "random",
    icon: "file:random.svg",
    group: ["transform"],
    version: 1,
    description: "Generate random numbers using Random.org API",
    defaults: {
      name: "Random",
    },
    inputs: ["main"],
    outputs: ["main"],
    properties: [
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        options: [
          {
            name: "True Random Number Generator",
            value: "generateNumber",
            description: "Generate a true random number using Random.org",
            action: "Generate a random number",
          },
        ],
        default: "generateNumber",
      },
      {
        displayName: "Min",
        name: "min",
        type: "number",
        default: 1,
        typeOptions: {
          numberStepSize: 1,
          numberPrecision: 0,
        },
        noDataExpression: true,
        required: true,
        description: "Minimum value (must be an integer)",
      },
      {
        displayName: "Max",
        name: "max",
        type: "number",
        typeOptions: {
          numberStepSize: 1,
          numberPrecision: 0,
        },
        default: 100,
        noDataExpression: true,
        required: true,
        description: "Maximum value (must be an integer)",
      },
    ],
  };
  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    let responseData;
    const returnData = [];
    const min = this.getNodeParameter("min", 0) as number;
    const max = this.getNodeParameter("max", 0) as number;
    const operation = this.getNodeParameter("operation", 0) as string;

    for (let i = 0; i < items.length; i++) {
      if (operation === "generateNumber") {
        if (min >= max) {
          throw new NodeOperationError(
            this.getNode(),
            "The minimum value must be less than the maximum value."
          );
        } else {
          const options: IHttpRequestOptions = {
            headers: {
              Accept: "application/json",
            },
            method: "GET",

            url: `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`,
            json: true,
          };
          responseData = await this.helpers.request.call(this, options);
          const randomNumber = parseInt(responseData, 10);
          returnData.push({ randomNumber: randomNumber });
        }
      }
    }
    return [this.helpers.returnJsonArray(returnData)];
  }
}
