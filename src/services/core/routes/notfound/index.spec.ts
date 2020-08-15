import httpMocks from "node-mocks-http";

jest.mock("@core/utils");

const createFailResponse = require("@core/utils").createFailResponse;
const notFoundController = require("./index").notFoundController;

describe("notFoundController", () => {
  let req: httpMocks.MockRequest<any>;
  let res: httpMocks.MockResponse<any>;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
  });

  it(`should call createFailResponse() with 404 status code`, () => {
    const status = 404;

    notFoundController(req, res);

    expect(createFailResponse).toHaveBeenCalledWith(
      req,
      res,
      status,
      "Not Found"
    );
  });
});
