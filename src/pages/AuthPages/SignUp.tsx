import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignUpForm from "../../components/auth/SignUpForm";

export default function SignUp() {
  return (
    <>
      <PageMeta
        title="Signup"
        description="This is for signup pages for fruit stand inventory"
      />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
