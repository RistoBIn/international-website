import axios from 'axios';

export async function fetchFromResourceApi(relativePath) {
  try {
    const options = {
      method: 'get',
      url: `/resources/v1${relativePath}`,
      baseURL: 'https://apim-bluethink.azure-api.net:443',
      headers: {
        'Cache-Control': 'no-cache',
      },
    };
    const responseData = await axios(options);
    return responseData;
  } catch (error) {
    console.error(error);
  }
  return undefined;
}

export default fetchFromResourceApi;
