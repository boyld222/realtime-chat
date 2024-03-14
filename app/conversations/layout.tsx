import getConversation from "../actions/getConversation";
import getUsers from "../actions/getUsers";
import Sidebar from "../components/Sidebar/Sidebar";
import ConversationList from "./components/ConversationList";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversation();
  const users = await getUsers();

  return (
    <div className="h-full">
      <Sidebar>
        <ConversationList
          users={users}
          title="Messages"
          initialItems={conversations}
        />
        {children}
      </Sidebar>
    </div>
  );
}
