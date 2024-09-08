import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import Subheading from "../components/Subheading";

const Signin = () => {
  return (
    <>
      <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <Heading label={"Sign In"} />
            <Subheading label={"Enter your credentials to Sign in"} />
            <InputBox placeholder="iamTHOR@gmail.com" label={"Email"} />
            <InputBox placeholder="*******" label={"Password"} />
            <div className="pt-4">
              <Button label={"Sign In"} />
            </div>
            <BottomWarning
              label={"Don't have an Account? "}
              buttonText={"Sign Up"}
              to={"/signup"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
