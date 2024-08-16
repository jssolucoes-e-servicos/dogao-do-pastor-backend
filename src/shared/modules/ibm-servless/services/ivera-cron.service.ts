import { PrismaService } from 'src/shared/modules/prisma/services/prisma.service';
import { LoggerService } from 'src/shared/modules/logger/services/logger.service';
import { ResponseResultsHelper } from 'src/shared/helpers/response-results.helper';
import { iStartNewAction } from '../interfaces/ibm-servless.interfaces';
import { configLoaderHelper } from 'src/shared/helpers/config-loader.helper';
import axios from 'axios';

export class IbmServlessService {
  constructor(
    private readonly _prisma: PrismaService,
    private readonly _logger: LoggerService,
    private _host: string,
    private _envName: string,
  ) {
    this._host = configLoaderHelper().ibm.apiHost;
    this._envName = configLoaderHelper().app.environment;
  }

  private readonly _name: string = 'IbmServlessService';

  async startNewAction(params: iStartNewAction) {
    try {
      const iam_token = await this.getIamToken();

      const actionName = `${params.action}-${
        this._envName == 'production' ? 'production' : 'beta'
      }`;
      const url = `${this._host}/${actionName}?blocking=${params.waitForResult}`;

      const response = await axios.post(
        url,
        { data: params.data },
        {
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            Authorization: `Bearer ${iam_token}`,
          },
        },
      );

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`HTTP request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error(error.message);
      this._logger.setError(this._name, error.message);
      ResponseResultsHelper.ErrorMessage(error.message);
    }
  }

  private async getIamToken() {
    const client_iam_token = axios.create({
      baseURL: 'https://iam.cloud.ibm.com',
    });

    const iam_token_response = await client_iam_token.post(
      'identity/token',
      `grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${
        configLoaderHelper().ibm.apikey
      }`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          accept: 'application/json',
        },
      },
    );
    return iam_token_response?.data?.token;
  }
}
