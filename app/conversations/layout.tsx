import { FunctionComponent, ReactNode } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import ConversationList from "../users/components/components/ConversationList";

interface ConversationsLayoutProps {
  children: ReactNode;
}

const ConversationsLayout: FunctionComponent<
  ConversationsLayoutProps
> = async ({ children }) => {
  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={[]} />
        {children}
      </div>
    </Sidebar>
  );
};

export default ConversationsLayout;
