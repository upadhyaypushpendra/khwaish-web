import shallow from "zustand/shallow";
import { useStore } from "../../store";
import { ChatsSubSection, Section } from "../../types";

export default function Chat() {
    const [section, subSection] = useStore((state) => [state.section, state.subSection], shallow);
    const [activeChat] = useStore((state) => [state.activeChat], shallow);

    return section === Section.chats && subSection === ChatsSubSection.chat ? (
        <div>
            <h1>{activeChat?.name}</h1>
            <h1>{activeChat?.phone}</h1>
            <h1>{activeChat?.about}</h1>
        </div>
    ) : null;
}