import { PropsWithChildren } from "react";
import "./style.css";

import Text from "../../atoms/Text/Text";

const MainLayout = (props: PropsWithChildren) => {
  return (
    <>
      <div className="header">
        <Text text="Restaurant Donations" isUnderlined={false} />
      </div>

      <div className="main-content">{props.children}</div>

      <div className="footer">
        <Text text="Made with love 🖤" isUnderlined={false} />
      </div>
    </>
  );
};

export default MainLayout;
