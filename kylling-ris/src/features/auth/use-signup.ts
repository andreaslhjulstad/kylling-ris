import { gql, useMutation } from "@apollo/client";

//Provides a function to sign up a new user. Sets userId in local storage. Promised boolean is whether the signup was successful or not.
export function useSignup(): (
  name: string,
  email: string,
  password: string
) => Promise<boolean> {
  const [signUp] = useMutation(gql`
    mutation SignUp($name: String!, $email: String!, $password: String!) {
      signUp(name: $name, email: $email, password: $password)
    }
  `);

  return (name, email, password) =>
    signUp({
      variables: {
        name,
        email,
        password
      }
    })
      .then((result) => {
        const userId = result.data?.signUp;
        if (userId !== null) {
          localStorage.setItem("userId", userId);
        }
        return userId !== null;
      })
      .catch(() => false);
}
