import React from "react";
import Title from "components/common/Title";
import Button from "components/common/Button";
import InputText from "components/common/InputText";

function Home() {
  return (
    <>
      <Title size={"large"} color="background">
        Title test
      </Title>
      <Button size="large" scheme="primary">
        Button test
      </Button>
      <InputText placeholder="Input here" />
      <div>home body</div>
    </>
  );
}

export default Home;
