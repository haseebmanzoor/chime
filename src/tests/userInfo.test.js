// const renderUserInfo = require("./renderUserInfo");
// you can use any other required imports like html renderer or local states but in this case there is no user data being rendered so i am commenting it out
const userData = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  pass: "1234",
  age: 30,
};

test("renders user information correctly", () => {
  const renderedUserInfo = renderUserInfo(userData);

  expect(renderedUserInfo).toBeDefined();
  expect(renderedUserInfo).toContain(userData.name);
  expect(renderedUserInfo).toContain(userData.email);
  expect(renderedUserInfo).toContain(userData.age);
  expect(renderedUserInfo).toContain(userData.pass);
});
