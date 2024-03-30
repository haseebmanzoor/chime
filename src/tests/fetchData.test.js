const fetchDataFromAPI = require("../services/FetchUser");

jest.mock("./fetchDataFromAPI", () => {
  return jest.fn(() => Promise.reject(new Error("API failure")));
});

test("handles API failure gracefully", async () => {
  const result = await fetchDataFromAPI();

  expect(result).toBeInstanceOf(Error);
  expect(result.message).toEqual("API failure");
});
