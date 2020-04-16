import Api from "./Api";
import MockAdapter from "axios-mock-adapter";
import Mock from "./ServiceApi.mock";

const makeRequest = ({
  token = null,
  url = null,
  mockResponse = null,
  apiMethod = null,
  apiPayload = null,
}) => {
  const options = {
    baseURL: process.env.API_BASE_URL || "https://api.spotify.com/v1",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const NormalApi = Api(options);
  const MockApi = Api(options);
  const mock = new MockAdapter(MockApi, { delayResponse: 1300 });
  const useMock = process.env.MOCK === "true";
  const selectedApi = useMock && mockResponse ? MockApi : NormalApi;
  const mockMethods = {
    get: "onGet",
  };
  if (mockResponse) {
    const mockMethod = mockMethods[apiMethod];
    mock[mockMethod](url).reply(() => mockResponse);
  }
  return selectedApi[apiMethod](url, apiPayload);
};

export default {
  search({ token, query, limit = 10, offset = 0 }) {
    return makeRequest({
      token,
      url: `/search?q=${query}&type=album,track&limit=${limit}&offset=${offset}`,
      apiMethod: "get",
      mockResponse: Mock.search,
    });
  },

  album({ token, id }) {
    return makeRequest({
      token,
      url: `https://api.spotify.com/v1/albums/${id}`,
      apiMethod: "get",
      mockResponse: Mock.album,
    });
  },
};