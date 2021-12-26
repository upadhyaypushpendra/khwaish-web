import { Drawer } from "@mui/material";
import React from "react";
import shallow from "zustand/shallow";
import Picker, { IEmojiData } from "emoji-picker-react";
import { useStore } from "../store";

export type EmojiPickerProps = {
  onEmojiClick: (e: IEmojiData) => void;
};

const EmojiPicker = ({ onEmojiClick }: EmojiPickerProps) => {
  const [emojiOpen, toggleEmojiOpen] = useStore(
    (state) => [state.isLoggedIn, state.toggleEmojiOpen],
    shallow
  );

  const handleEmojiClick = (
    event: React.MouseEvent,
    emojiObject: IEmojiData
  ) => {
    onEmojiClick(emojiObject);
  };

  return (
    <Drawer anchor={"bottom"} open={emojiOpen} onClose={toggleEmojiOpen}>
      <Picker
        onEmojiClick={handleEmojiClick}
        preload={false}
        disableAutoFocus
        native
      />
    </Drawer>
  );
};

export default EmojiPicker;
