import Template from "./Template";
import { TemplateProps } from "../utils/interface";

const Layout: React.FC<TemplateProps> = ({ children }) => {
  return <Template children={children} />;
};
export default Layout;
