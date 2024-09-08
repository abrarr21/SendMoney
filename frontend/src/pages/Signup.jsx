import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import Subheading from "../components/Subheading";

const Signup = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign Up"} />
          <Subheading lable={"Enter your information to create an account."} />
          <InputBox placeholder="Chris" label={"First Name"} />
          <InputBox placeholder="Hemsworth" label={"Last Name"} />
          <InputBox placeholder="iamTHOR@gmail.com" label={"Email"} />
          <InputBox placeholder="********" label={"Password"} />
          <div className="pt-4">
            <Button label={"Sign up"} />
          </div>
          <BottomWarning
            label={"Already have an account! "}
            buttonText={"Sign In"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
