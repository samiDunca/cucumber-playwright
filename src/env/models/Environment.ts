declare namespace TestData {
    interface User {
      validUser?: UserCredentials;
      invalidUser?: UserCredentials;
    }
  
    interface UserCredentials {
      email: string;
      password: string;
    }
  }
  
  export default TestData;
  