import { useState } from "react";
import { Radio, Typography } from "antd";
import Cards from "../components/common/Cards";

const { Title } = Typography;
const Auth = () => {
  const [signin, setSignin] = useState("signin");

  const onChange = (e) => {
    setSignin(e.target.value);
  };

  return (
    <>
      <Title style={{ color: "#fc6b03", fontFamily: "fantasy" }}>
        Shop Cart
      </Title>
      <Radio.Group
        value={signin}
        onChange={onChange}
        style={{
          marginBottom: 16,
          zIndex: 10,
        }}
      >
        <Radio.Button value="signup">Sign up</Radio.Button>
        <Radio.Button value="signin">Sign in</Radio.Button>
      </Radio.Group>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          marginTop: "-2rem",
        }}
      >
        <div className="auth">
          {signin == "signin" ? (
            <Cards component={true} />
          ) : (
            <Cards component={false} />
          )}
        </div>
      </div>
    </>
  );
};

export default Auth;
