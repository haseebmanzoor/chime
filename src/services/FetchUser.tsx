export function fetchUserData() {
  return new Promise((resolve: any, reject: any) => {
    setTimeout(() => {
      const userData = {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        pass: "1234",
        age: 30,
      };
      resolve(userData);
    }, 1000);
  });
}
